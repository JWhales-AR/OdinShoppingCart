import type { ProductType } from "../shopping/ProductCard";

export interface ProductStoredType extends ProductType {
  quantity: number;
}

const storage: Storage = (() => {
  function isLocalStorageAvailable() {
    const test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  type ItemType = {
    key: string;
    data: string;
  };

  class FakeStorage {
    #data: ItemType[];
    length = NaN;
    constructor() {
      this.#data = [];
    }

    clear() {
      this.#data = [];
    }
    key(): string | null {
      return null;
    }
    getItem(key: string): string | null {
      return this.#data.find((obj) => obj.key === key)?.data || null;
    }
    removeItem(key: string) {
      const itemIndex = this.#data.findIndex((obj) => obj.key === key);
      if (itemIndex !== -1) this.#data.splice(itemIndex, 1);
    }
    setItem(key: string, data: string) {
      const itemIndex = this.#data.findIndex((obj) => obj.key === key);
      if (itemIndex !== -1) this.#data[itemIndex].data = data;
      this.#data.push({ key, data });
    }
  }

  if (isLocalStorageAvailable()) {
    return localStorage;
  } else {
    return new FakeStorage();
  }
})();

const CART_LABEL = "cart";
export default class CartStorage {
  getProductsInCart(): ProductStoredType[] {
    return JSON.parse(storage.getItem(CART_LABEL) ?? "[]");
  }

  removeProduct(productId: number) {
    const productsInCart = this.getProductsInCart();
    const productIndex = productsInCart.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex !== -1) productsInCart.splice(productIndex, 1);
    storage.setItem(CART_LABEL, JSON.stringify(productsInCart));
  }

  addProduct(newProduct: ProductStoredType, increment: boolean = false) {
    const productsInCart = this.getProductsInCart();
    const productIndex = productsInCart.findIndex(
      (product) => product.id === newProduct.id,
    );
    if (productIndex !== -1) {
      if (increment) {
        productsInCart[productIndex].quantity += newProduct.quantity;
      } else {
        console.log(newProduct);
        productsInCart[productIndex] = newProduct;
      }
    } else {
      productsInCart.push(newProduct);
    }
    storage.setItem(CART_LABEL, JSON.stringify(productsInCart));
  }
}
