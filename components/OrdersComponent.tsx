"use client";

import { Order } from "@/sanity.types";
import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "./ui/table";
import OrderModal from "./OrderModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { format } from "date-fns";

const OrdersComponent = ({ orders }: { orders: Order[] }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders?.map((orders) => (
            <Tooltip key={orders._id}>
              <TooltipTrigger asChild>
                <TableRow
                  onClick={() => setSelectedOrder(orders)}
                  className="cursor-pointer hover:bg-gray-100 h-12"
                >
                  <TableCell className="font-semibold text-darkColor/80">{orders.orderId?.slice(-10) ?? "N/A"}...</TableCell>
                  <TableCell>
                    {orders.createdAt && format(new Date(orders.createdAt ?? 0), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{orders.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {orders.customerEmail}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {orders.deliveryAddress}
                  </TableCell>
                  <TableCell className="font-semibold text-darkColor/80">
                    ₦{(orders.totalAmount ?? 0).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${orders.status === "pending" && "bg-yellow-100 text-yellow-700"} ${orders.status === "processing" && "bg-blue-100 text-blue-700"} ${orders.status === "shipped" && "bg-purple-100 text-purple-700"} ${orders.status === "delivered" && "bg-green-100 text-green-700"} ${orders.status === "cancelled" && "bg-red-100 text-red-700"}`}
                    >
                      {orders.status?.charAt(0).toUpperCase() +
                        orders.status?.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>Click to view order details</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};

export default OrdersComponent;
