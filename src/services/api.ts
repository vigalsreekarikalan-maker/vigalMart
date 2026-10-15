import {
  Product,
  Category,
  Order,
  User,
  Address,
  Review,
  CartItem,
  SavedForLaterItem,
  FilterOptions,
  SellerStats,
  AdminStats
} from '../types';

import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_USERS,
  INITIAL_ADDRESSES,
  INITIAL_ORDERS,
  INITIAL_REVIEWS
} from '../data/mockData';

// ------------------------------------
// STORAGE KEYS
// ------------------------------------

const STORAGE_KEYS = {
  PRODUCTS: 'vgm_products_v2',
  CATEGORIES: 'vgm_categories_v2',
  USERS: 'vgm_users_v2',
  CURRENT_USER: 'vgm_current_user_v2',
  CART: 'vgm_cart_v2',
  SAVED_FOR_LATER: 'vgm_saved_later_v2',
  WISHLIST: 'vgm_wishlist_v2',
  ORDERS: 'vgm_orders_v2',
  ADDRESSES: 'vgm_addresses_v2',
  REVIEWS: 'vgm_reviews_v2'
};

// ------------------------------------
// LOCAL STORAGE HELPERS
// ------------------------------------

function getStorage<T>(
  key: string,
  defaultValue: T
): T {
  try {
    const item =
      localStorage.getItem(key);

    return item
      ? (JSON.parse(item) as T)
      : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorage<T>(
  key: string,
  value: T
): void {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      'Storage error:',
      error
    );
  }
}

// ------------------------------------
// INITIALIZE STORAGE
// ------------------------------------

if (
  !localStorage.getItem(
    STORAGE_KEYS.PRODUCTS
  )
) {
  setStorage(
    STORAGE_KEYS.PRODUCTS,
    INITIAL_PRODUCTS
  );
}

if (
  !localStorage.getItem(
    STORAGE_KEYS.CATEGORIES
  )
) {
  setStorage(
    STORAGE_KEYS.CATEGORIES,
    INITIAL_CATEGORIES
  );
}

// ------------------------------------
// POSTGRESQL PRODUCT API
// ------------------------------------

interface DatabaseProduct {
  id: number;
  name: string;
  price: string | number;
}

async function fetchDatabaseProducts(): Promise<Product[]> {
  const response =
    await fetch('/api/products');

  if (!response.ok) {
    throw new Error(
      `Unable to fetch products. Status: ${response.status}`
    );
  }

  const data: {
    success: boolean;
    products: DatabaseProduct[];
  } = await response.json();

  if (
    !data.success ||
    !Array.isArray(data.products)
  ) {
    throw new Error(
      'Invalid products response from backend'
    );
  }

  return data.products.map(
    (item, index) => {

      const price =
        Number(item.price);

      const sampleProduct =
        INITIAL_PRODUCTS.length > 0
          ? INITIAL_PRODUCTS[
              index %
                INITIAL_PRODUCTS.length
            ]
          : undefined;

      return {
        id:
          `db-${item.id}`,

        name:
          item.name,

        brand:
          'VigalMart',

        category:
          'Electronics',

        price:
          Number.isFinite(price)
            ? price
            : 0,

        originalPrice:
          Number.isFinite(price)
            ? price
            : 0,

        discountPercentage:
          0,

        rating:
          0,

        reviewCount:
          0,

        stock:
          10,

        inStock:
          true,

        deliveryInfo:
          'Standard Delivery',

        image:
          sampleProduct?.image ??
          '',

        description:
          item.name,

        features:
          [],

        specifications:
          {},

        sku:
          `DB-${item.id}`,

        approved:
          true
      };
    }
  );
}

// ------------------------------------
// API SERVICE
// ------------------------------------

export const ApiService = {

  // ==================================
  // AUTHENTICATION
  // ==================================

  getCurrentUser(): User {

    return getStorage<User>(
      STORAGE_KEYS.CURRENT_USER,
      INITIAL_USERS[0]
    );
  },

  setCurrentUser(
    user: User
  ): void {

    setStorage(
      STORAGE_KEYS.CURRENT_USER,
      user
    );

    window.dispatchEvent(
      new Event(
        'vgm_auth_changed'
      )
    );
  },

  getAllUsers(): User[] {

    return getStorage<User[]>(
      STORAGE_KEYS.USERS,
      INITIAL_USERS
    );
  },

  updateUserStatus(
    userId: string,
    action:
      | 'activate'
      | 'deactivate'
      | 'suspend'
  ): User[] {

    const users =
      this.getAllUsers().map(
        user =>
          user.id === userId
            ? {
                ...user,
                status: action
              }
            : user
      );

    setStorage(
      STORAGE_KEYS.USERS,
      users
    );

    return users;
  },

  // ==================================
  // LOAD PRODUCTS FROM POSTGRESQL
  // ==================================

  async loadDatabaseProducts(): Promise<Product[]> {

    const databaseProducts =
      await fetchDatabaseProducts();

    const existingProducts =
      getStorage<Product[]>(
        STORAGE_KEYS.PRODUCTS,
        INITIAL_PRODUCTS
      );

    const otherProducts =
      existingProducts.filter(
        product =>
          !product.id.startsWith(
            'db-'
          )
      );

    const mergedProducts = [
      ...databaseProducts,
      ...otherProducts
    ];

    setStorage(
      STORAGE_KEYS.PRODUCTS,
      mergedProducts
    );

    window.dispatchEvent(
      new Event(
        'vgm_products_changed'
      )
    );

    return mergedProducts;
  },

  // ==================================
  // PRODUCTS
  // ==================================

  getProducts(
    filters?: FilterOptions
  ): Product[] {

    let products =
      getStorage<Product[]>(
        STORAGE_KEYS.PRODUCTS,
        INITIAL_PRODUCTS
      );

    if (!filters) {
      return products;
    }

    // SEARCH

    if (filters.query) {

      const query =
        filters.query.toLowerCase();

      products =
        products.filter(
          product =>
            product.name
              .toLowerCase()
              .includes(query) ||

            product.brand
              .toLowerCase()
              .includes(query) ||

            product.category
              .toLowerCase()
              .includes(query) ||

            product.description
              .toLowerCase()
              .includes(query) ||

            product.sku
              .toLowerCase()
              .includes(query)
        );
    }

    // CATEGORY

    if (
      filters.category &&
      filters.category !== 'All'
    ) {

      products =
        products.filter(
          product =>
            product.category
              .toLowerCase() ===
            filters.category!
.toLowerCase()
        );
    }

    // BRAND

    if (filters.brand) {

      products =
        products.filter(
          product =>
            product.brand
              .toLowerCase() ===
            filters.brand!
              .toLowerCase()
        );
    }

    // MIN PRICE

    if (
      filters.minPrice !==
      undefined
    ) {

      products =
        products.filter(
          product =>
            product.price >=
            filters.minPrice!
        );
    }

    // MAX PRICE

    if (
      filters.maxPrice !==
      undefined
    ) {

      products =
        products.filter(
          product =>
            product.price <=
            filters.maxPrice!
        );
    }

    // MIN RATING

    if (
      filters.minRating !==
      undefined
    ) {

      products =
        products.filter(
          product =>
            product.rating >=
            filters.minRating!
        );
    }

    // IN STOCK

    if (
      filters.inStockOnly
    ) {

      products =
        products.filter(
          product =>
            product.inStock &&
            product.stock > 0
        );
    }

    // DISCOUNT

    if (
      filters.discountOnly
    ) {

      products =
        products.filter(
          product =>
            product.discountPercentage >
            0
        );
    }

    // SORT

    if (filters.sortBy) {

      switch (
        filters.sortBy
      ) {

        case 'price-low':

          products.sort(
            (a, b) =>
              a.price -
              b.price
          );

          break;

        case 'price-high':

          products.sort(
            (a, b) =>
              b.price -
              a.price
          );

          break;

        case 'rating':

          products.sort(
            (a, b) =>
              b.rating -
              a.rating
          );

          break;

        case 'newest':

          products.sort(
            (a, b) =>
              Number(
                Boolean(
                  b.isNewRelease
                )
              ) -
              Number(
                Boolean(
                  a.isNewRelease
                )
              )
          );

          break;

        case 'best-selling':

          products.sort(
            (a, b) =>
              b.reviewCount -
              a.reviewCount
          );

          break;
      }
    }

    return products;
  },

  getProductById(
    id: string
  ): Product | undefined {

    const products =
      this.getProducts();

    return products.find(
      product =>
        product.id === id
    );
  },
  // ==================================
  // SAVE PRODUCT
  // ==================================

  saveProduct(
        product: Partial<Product>
  ): Product {
    console.log('SAVE PRODUCT FUNCTION CALLED', product.id);
    const products =
      this.getProducts();

    let saved: Product;

    // UPDATE EXISTING PRODUCT

    if (product.id) {
      console.log('PRODUCT ID:', product.id);

      const index =
        products.findIndex(
          item =>
            item.id ===
            product.id
        );

      if (index !== -1) {
        if (product.id.startsWith('db-')) {
          console.log('EDITING PRODUCT ID:', product.id);
          console.log('UPDATE PRODUCT ID:', product.id);
  fetch(`/api/products/${product.id.replace('db-', '')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: product.name,
      price: Number(product.price)
    })
  })
    .then(response => {
      if (!response.ok) {
        console.error('Database product update failed');
      }
    })
    .catch(error => {
      console.error('Product update error:', error);
    });
}
        saved = {
          ...products[index],
          ...product
        } as Product;

        products[index] =
          saved;

      } else {

        saved =
          product as Product;

        products.push(saved);
      }

    } else {

      // CREATE NEW PRODUCT

      const newId =
        `vgm-prod-${Date.now()}`;

      const stock =
        product.stock ?? 10;

      const price =
        product.price ?? 999;

      saved = {

        id:
          newId,

        name:
          product.name ||
          'New Product',

        brand:
          product.brand ||
          'VigalBrand',

        category:
          product.category ||
          'Electronics',

        price:

          price,

        originalPrice:
          product.originalPrice ??
          1299,

        discountPercentage:
          product.discountPercentage ??
          23,

        rating:
          product.rating ??
          0,

        reviewCount:
          product.reviewCount ??
          0,

        stock:

          stock,

        inStock:
          stock > 0,

        deliveryInfo:
          'FREE Standard Delivery',

        image:
          product.image ||
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',

        description:
          product.description ||
          'Product available on VigalMart',

        features:
          product.features ||
          [
            'Original product guarantee'
          ],

        specifications:
          product.specifications ||
          {
            Warranty:
              '1 Year'
          },

        sellerId:
          product.sellerId ||
          'seller-1',

        sellerName:
          product.sellerName ||
          'VigalTech Solutions',

        sku:
          product.sku ||
          `VGM-SKU-${Date.now()}`,

        approved:
          product.approved ??
          true
      };

      products.unshift(
        saved
      );
      // ==================================
      // SAVE NEW PRODUCT TO POSTGRESQL
      // ==================================

      fetch(
        '/api/products',
        {
          method:
            'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body:
            JSON.stringify(
              saved
            )
        }
      )
        .then(
          response => {

            if (!response.ok) {

              throw new Error(
                'Failed to save product to PostgreSQL'
              );
            }

            return response.json();
          }
        )
        .then(
          data => {

            console.log(
              'Product saved to PostgreSQL:',
              data.product
            );

            // Update frontend ID
            // with PostgreSQL ID

            if (
              data?.product?.id !==
              undefined
            ) {

              const databaseProductId =
                data.product.id;

              const currentProducts =
                this.getProducts();

              const updatedProducts =
                currentProducts.map(
                  product =>
                    product.id ===
                    saved.id
                      ? {
                          ...product,
                          id:
                            `db-${databaseProductId}`
                        }
                      : product
                );

              setStorage(
                STORAGE_KEYS.PRODUCTS,
                updatedProducts
              );

              window.dispatchEvent(
                new Event(
                  'vgm_products_changed'
                )
              );
            }
          }
        )
        .catch(
          error => {

            console.error(
              'PostgreSQL product save failed:',
              error
            );
          }
        );
    }

    // Save products to localStorage

      window.dispatchEvent(
      new Event(
        'vgm_products_changed'
      )
    );

    return saved;
  },

  // ==================================
  // DELETE PRODUCT
  // ==================================

  deleteProduct(
    id: string
  ): void {

    console.log(
      'DELETE PRODUCT ID:',
      id
    );

    const products =
      this.getProducts().filter(
        product =>
          product.id !== id
      );

    // Remove from localStorage

    setStorage(
      STORAGE_KEYS.PRODUCTS,
      products
    );

    // Convert frontend ID
    // db-4 -> PostgreSQL ID 4

   if (!id.startsWith('db-')) {
  console.log(
    'Local product only; skipping database delete:',
    id
  );
  return;
}

const databaseId = id.replace('db-', '');

console.log('DATABASE ID:', databaseId);

    // Delete from PostgreSQL

    fetch(
  `/api/products/${databaseId}`,
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
      .then(
        response => {

          if (!response.ok) {

            throw new Error(
              'Failed to delete product from PostgreSQL'
            );
          }

          return response.json();
        }
      )
      .then(
        data => {

          console.log(
            'Product deleted from PostgreSQL:',
            data.message
          );
        }
      )
      .catch(
        error => {

          console.error(
            'PostgreSQL product delete failed:',
            error
          );
        }
      );

    window.dispatchEvent(
      new Event(
        'vgm_products_changed'
      )
    );
  },
  // ==================================
  // CATEGORIES
  // ==================================

  getCategories(): Category[] {

    return getStorage<Category[]>(
      STORAGE_KEYS.CATEGORIES,
      INITIAL_CATEGORIES
    );
  },

  // ==================================
  // CART
  // ==================================

  getCart(): CartItem[] {

    return getStorage<CartItem[]>(
      STORAGE_KEYS.CART,
      []
    );
  },

  addToCart(
    product: Product,
    quantity = 1
  ): CartItem[] {

    const cart =
      this.getCart();

    const existingItem =
      cart.find(
        item =>
          item.product.id ===
          product.id
      );

    if (existingItem) {

      existingItem.quantity +=
        quantity;

    } else {

      cart.push({
        product,
        quantity
      });
    }

    setStorage(
      STORAGE_KEYS.CART,
      cart
    );

    window.dispatchEvent(
      new Event(
        'vgm_cart_changed'
      )
    );

    return cart;
  },

  updateCartQuantity(
    productId: string,
    quantity: number
  ): CartItem[] {

    let cart =
      this.getCart();

    if (quantity <= 0) {

      cart =
        cart.filter(
          item =>
            item.product.id !==
            productId
        );

    } else {

      const item =
        cart.find(
          entry =>
            entry.product.id ===
            productId
        );

      if (item) {

        item.quantity =
          quantity;
      }
    }

    setStorage(
      STORAGE_KEYS.CART,
      cart
    );

    window.dispatchEvent(
      new Event(
        'vgm_cart_changed'
      )
    );

    return cart;
  },

  removeFromCart(
    productId: string
  ): CartItem[] {

    const cart =
      this.getCart().filter(
        item =>
          item.product.id !==
          productId
      );

    setStorage(
      STORAGE_KEYS.CART,
      cart
    );

    window.dispatchEvent(
      new Event(
        'vgm_cart_changed'
      )
    );

    return cart;
  },

  clearCart(): void {

    setStorage(
      STORAGE_KEYS.CART,
      []
    );

    window.dispatchEvent(
      new Event(
        'vgm_cart_changed'
      )
    );
  },

  // ==================================
  // SAVED FOR LATER
  // ==================================

  getSavedForLater():
    SavedForLaterItem[] {

    return getStorage<
      SavedForLaterItem[]
    >(
      STORAGE_KEYS.SAVED_FOR_LATER,
      []
    );
  },

  saveForLater(
    product: Product
  ): void {

    this.removeFromCart(
      product.id
    );

    const saved =
      this.getSavedForLater();

    if (
      !saved.some(
        item =>
          item.product.id ===
          product.id
      )
    ) {

      saved.push({
        product,

        addedAt:
          new Date()
            .toISOString()
      });

      setStorage(
        STORAGE_KEYS.SAVED_FOR_LATER,
        saved
      );

      window.dispatchEvent(
        new Event(
          'vgm_cart_changed'
        )
      );
    }
  },

  moveToCartFromSaved(
    product: Product
  ): void {

    const saved =
      this.getSavedForLater()
        .filter(
          item =>
            item.product.id !==
            product.id
        );

    setStorage(
      STORAGE_KEYS.SAVED_FOR_LATER,
      saved
    );

    this.addToCart(
      product,
      1
    );
  },
  // ==================================
  // WISHLIST
  // ==================================

  getWishlist(): string[] {

    return getStorage<string[]>(
      STORAGE_KEYS.WISHLIST,
      []
    );
  },

  toggleWishlist(
    productId: string
  ): boolean {

    const wishlist =
      this.getWishlist();

    const index =
      wishlist.indexOf(
        productId
      );

    let added = false;

    if (index !== -1) {

      wishlist.splice(
        index,
        1
      );

    } else {

      wishlist.push(
        productId
      );

      added = true;
    }

    setStorage(
      STORAGE_KEYS.WISHLIST,
      wishlist
    );

    window.dispatchEvent(
      new Event(
        'vgm_wishlist_changed'
      )
    );

    return added;
  },

  isInWishlist(
    productId: string
  ): boolean {

    return this
      .getWishlist()
      .includes(
        productId
      );
  },

  // ==================================
  // ADDRESSES
  // ==================================

  getAddresses(): Address[] {

    return getStorage<Address[]>(
      STORAGE_KEYS.ADDRESSES,
      INITIAL_ADDRESSES
    );
  },

  saveAddress(
    address: Partial<Address>
  ): Address[] {

    const addresses =
      this.getAddresses();

    if (address.id) {

      const index =
        addresses.findIndex(
          item =>
            item.id ===
            address.id
        );

      if (index !== -1) {

        addresses[index] = {
          ...addresses[index],
          ...address
        } as Address;
      }

    } else {

      const newAddress: Address = {

        id:
          `addr-${Date.now()}`,

        fullName:
          address.fullName ||
          'User',

        street:
          address.street ||
          '',

        city:
          address.city ||
          '',

        state:
          address.state ||
          '',

        zipCode:
          address.zipCode ||
          '',

        country:
          address.country ||
          'India',

        phone:
          address.phone ||
          '',

        isDefault:
          addresses.length ===
          0
      };

      addresses.push(
        newAddress
      );
    }

    setStorage(
      STORAGE_KEYS.ADDRESSES,
      addresses
    );

    return addresses;
  },

  // ==================================
  // ORDERS
  // ==================================

  getOrders(
    userId?: string
  ): Order[] {

    let orders =
      getStorage<Order[]>(
        STORAGE_KEYS.ORDERS,
        INITIAL_ORDERS
      );

    if (userId) {

      orders =
        orders.filter(
          order =>
            order.userId ===
            userId
        );
    }

    return orders.sort(
      (a, b) =>
        new Date(
          b.orderDate
        ).getTime() -
        new Date(
          a.orderDate
        ).getTime()
    );
  },

  getOrderById(
    orderId: string
  ): Order | undefined {

    return this
      .getOrders()
      .find(
        order =>
          order.id ===
          orderId
      );
  },

  async createOrder(
    items: CartItem[],
    shippingAddress: Address,
    paymentMethod:
      | 'COD'
      | 'UPI_DEMO'
      | 'CARD_DEMO'
  ): Promise<Order> {

    const currentUser =
      this.getCurrentUser();

    const itemsTotal =
      items.reduce(
        (sum, item) =>
          sum +
          item.product.price *
            item.quantity,
        0
      );

    const originalTotal =
      items.reduce(
        (sum, item) =>
          sum +
          item.product.originalPrice *
            item.quantity,
        0
      );

    const discountTotal =
      Math.max(
        0,
        originalTotal -
          itemsTotal
      );

    const deliveryFee =
      itemsTotal > 499
        ? 0
        : 49;

    const tax =
      Math.round(
        itemsTotal * 0.05
      );

    const grandTotal =
      itemsTotal +
      deliveryFee +
      tax;

    const now =
      new Date()
        .toISOString()
        .replace(
          'T',
          ' '
        )
        .slice(
          0,
          16
        );

    const newOrder: Order = {

      id:
        `VGM-${Date.now()}-${Math.floor(
          Math.random() * 1000
        )}`,

      userId:
        currentUser.id,

      userEmail:
        currentUser.email,

      items:
        items.map(
          item => ({
            product:
              item.product,

            quantity:
              item.quantity,

            price:
              item.product.price
          })
        ),

      shippingAddress,

      paymentMethod,

      paymentStatus:
        'COMPLETED',

      itemsTotal,

      discountTotal,

      deliveryFee,

      tax,

      grandTotal,

      status:
        'PLACED',

      orderDate:
        now,

      estimatedDelivery:
        new Date(
          Date.now() +
          86400000 * 2
        ).toLocaleDateString(
          'en-US',
          {
            month:
              'short',

            day:
              'numeric',

            year:
              'numeric'
          }
        ),

      statusHistory: [

        {
          status:
            'PLACED',

          timestamp:
            now,

          description:
            'Order placed successfully on VigalMart'
        },

        {
          status:
            'CONFIRMED',

          timestamp:
            now,

          description:
            'Order confirmed by seller'
        }
      ]
    };

    // SAVE ORDER TO POSTGRESQL

    const response =
      await fetch(
        '/api/orders',
        {
          method:
            'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body:
            JSON.stringify(
              newOrder
            )
        }
      );

    const result =
      await response.json();

    if (
      !response.ok ||
      !result.success
    ) {

      throw new Error(
        result.message ||
        'Failed to save order to PostgreSQL'
      );
    }

    // SAVE LOCAL COPY

    const orders =
      this.getOrders();

    orders.unshift(
      newOrder
    );

    setStorage(
      STORAGE_KEYS.ORDERS,
      orders
    );

    this.clearCart();

    window.dispatchEvent(
      new Event(
        'vgm_orders_changed'
      )
    );

    return newOrder;
  },

  updateOrderStatus(
    orderId: string,
    _status: Order,
    newStatus: string
  ): Order | undefined {

    const orders =
      this.getOrders();

    const order =
      orders.find(
        item =>
          item.id ===
          orderId
      );

    if (order) {

      order.status =
        newStatus as Order['status'];

      order.statusHistory.push({
        status:
          newStatus as Order['status'],

        timestamp:
          new Date()
            .toISOString()
            .replace(
              'T',
              ' '
            )
            .slice(
              0,
              16
            ),

        description:
          `Order status updated to ${newStatus}`
      });

      // Save locally

      setStorage(
        STORAGE_KEYS.ORDERS,
        orders
      );

      // Save to PostgreSQL

      fetch(
        `/api/orders/${orderId}/status`,
        {
          method:
            'PUT',

          headers: {
            'Content-Type':
              'application/json'
          },

          body:
            JSON.stringify({
              status:
                newStatus.toUpperCase()
            })
        }
      )
        .then(
          response => {

            if (!response.ok) {

              throw new Error(
                'Failed to update order status in database'
              );
            }

            return response.json();
          }
        )
        .then(
          () => {

            console.log(
              'Order status saved to PostgreSQL:',
              newStatus
            );
          }
        )
        .catch(
          error => {

            console.error(
              'PostgreSQL status update failed:',
              error
            );
          }
        );

      window.dispatchEvent(
        new Event(
          'vgm_orders_changed'
        )
      );
    }

    return order;
  },
  // ==================================
  // REVIEWS
  // ==================================

  getReviewsForProduct(
    productId: string
  ): Review[] {

    return getStorage<Review[]>(
      STORAGE_KEYS.REVIEWS,
      INITIAL_REVIEWS
    ).filter(
      review =>
        review.productId ===
        productId
    );
  },

  addReview(
    productId: string,
    rating: number,
    comment: string
  ): Review {

    const currentUser =
      this.getCurrentUser();

    const reviews =
      getStorage<Review[]>(
        STORAGE_KEYS.REVIEWS,
        INITIAL_REVIEWS
      );

    const newReview: Review = {

      id:
        `rev-${Date.now()}`,

      productId,

      userId:
        currentUser.id,

      userName:
        currentUser.name,

      rating,

      comment,

      date:
        new Date()
          .toISOString()
          .split('T')[0],

      verifiedPurchase:
        true
    };

    reviews.unshift(
      newReview
    );

    setStorage(
      STORAGE_KEYS.REVIEWS,
      reviews
    );

    const product =
      this.getProductById(
        productId
      );

    if (product) {

      const productReviews =
        reviews.filter(
          review =>
            review.productId ===
            productId
        );

      const average =
        productReviews.reduce(
          (sum, review) =>
            sum +
            review.rating,
          0
        ) /
        productReviews.length;

      product.rating =
        Number(
          average.toFixed(1)
        );

      product.reviewCount =
        productReviews.length;

      this.saveProduct(
        product
      );
    }

    return newReview;
  },

  // ==================================
  // SELLER DASHBOARD
  // ==================================

  getSellerStats(
    sellerId = 'seller-1'
  ): SellerStats {

    const products =
      this.getProducts().filter(
        product =>
          product.sellerId ===
            sellerId ||
          product.sellerName
            ?.includes(
              'VigalTech'
            )
      );

    const orders =
      this.getOrders();

    const totalSales =
      orders.length;

    const revenue =
      orders.reduce(
        (sum, order) =>
          sum +
          order.grandTotal,
        0
      );

    const pendingOrders =
      orders.filter(
        order =>
          order.status ===
            'PLACED' ||
          order.status ===
            'CONFIRMED' ||
          order.status ===
            'PROCESSING'
      ).length;

    const lowStockItems =
      products.filter(
        product =>
          product.stock <= 5
      ).length;

    return {

      totalProducts:
        products.length,

      totalSales,

      revenue,

      pendingOrders,

      lowStockItems

    } as SellerStats;
  },

  // ==================================
  // ADMIN STATS
  // ==================================

  getAdminStats(): AdminStats {

    const users =
      this.getAllUsers();

    const products =
      this.getProducts();

    const orders =
      this.getOrders();

    const totalUsers =
      users.length;

    const totalSellers =
      users.filter(
        user => {

          const role =
            String(
              (user as any)
                .role ||
              ''
            ).toLowerCase();

          return (
            role === 'seller' ||
            role === 'admin'
          );
        }
      ).length;

    const totalProducts =
      products.length;

    const totalOrders =
      orders.length;

    const revenue =
      orders.reduce(
        (sum, order) =>
          sum +
          order.grandTotal,
        0
      );

    const pendingOrders =
      orders.filter(
        order =>
          order.status ===
            'PLACED' ||
          order.status ===
            'CONFIRMED' ||
          order.status ===
            'PROCESSING'
      ).length;

    return {

      totalUsers,

      totalSellers,

      totalProducts,

      totalOrders,

      revenue,

      pendingOrders,

      pendingApprovals:
        2

    } as AdminStats;
  }
};