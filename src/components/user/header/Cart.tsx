"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { Badge } from "@mui/material";
import { ShoppingBag } from "lucide-react";

function Cart() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const init = async () => {
      const res = await axios.get("/api/cart");
      setCount(res.data.count);
    };

    init();
  });

  console.log("count: ", count);
  

  return (
    <div>
      <Badge badgeContent={count} color="secondary">
        <ShoppingBag />
      </Badge>
    </div>
  );
}

export default Cart;
