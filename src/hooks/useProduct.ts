import { useCallback } from "react";
import { ProductRepository } from "../repositories/ProductRepository";

const ProductRepo = new ProductRepository();

export function useProduct() {
  const getProducts = useCallback(ProductRepo.getProducts.bind(ProductRepo), []);
  const showProduct = useCallback(ProductRepo.showProduct.bind(ProductRepo), []);
  const addProduct = useCallback(ProductRepo.addProduct.bind(ProductRepo), []);
  const deleteProduct = useCallback(ProductRepo.deleteProduct.bind(ProductRepo), []);
  const updateProduct = useCallback(ProductRepo.updateProduct.bind(ProductRepo), []);

  
  return {
    getProducts,
    showProduct,
    addProduct,
    deleteProduct,
    updateProduct
  };
}
