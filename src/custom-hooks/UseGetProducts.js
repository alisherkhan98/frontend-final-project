import { useEffect, useState } from "react";
// firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function useGetProducts() {
  const [products, setProducts] = useState({});
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("active", "==", true));

  useEffect(() => {
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const priceRef = collection(doc.ref, "prices");
        getDocs(priceRef).then((priceSnap) => {
          priceSnap.forEach((price) => {
            setProducts((prev) => ({
              ...prev,
              [doc.data().name]: price.id,
            }));
          });
        });
      });
    });
  }, [q]);

  return products;
}

export default useGetProducts;
