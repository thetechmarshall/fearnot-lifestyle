"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Order } from "@/sanity.types";
import { format } from "date-fns";
import { generateInvoice } from "@/lib/utils/generateInvoice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import PriceFormatter from "./PriceFormatter";
import { urlFor } from "@/sanity/lib/image";

interface OrderModalProps {
  order: Order;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const subtotalAmount =
    order.subtotalAmount ??
    order.items?.reduce(
      (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
      0
    ) ??
    0;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold line-clamp-1">
            Order Details - {order.orderId}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-1 text-sm mb-4">
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Email:</strong> {order.customerEmail}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {order.createdAt &&
              format(new Date(order.createdAt ?? 0), "dd/MM/yyyy")}
          </p>
          <p>
            <strong>Delivery Address:</strong> {order.deliveryAddress}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-xs font-semibold capitalize ${order.status === "pending" && "bg-yellow-100 text-yellow-700"} ${order.status === "processing" && "bg-blue-100 text-blue-700"} ${order.status === "shipped" && "bg-purple-100 text-purple-700"} ${order.status === "delivered" && "bg-green-100 text-green-700"} ${order.status === "cancelled" && "bg-red-100 text-red-700"}`}
            >
              {order.status}
            </span>
          </p>
          <Button
            onClick={() => generateInvoice(order)}
            variant="outline"
            size="sm"
            className="mt-2"
          >
            Download Invoice
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items?.map((item, index) => (
              <TableRow
                key={item._key || `${item.name}-${index}`}
                className="border-b"
              >
                <TableCell className="flex items-center gap-3 py-2">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      alt="product-image"
                      width={50}
                      height={50}
                      className="rounded object-cover w-14 h-14 border hoverEffect hover:scale-105"
                    />
                  )}
                  {order.items && <p className="line-clamp-1">{item.name}</p>}
                  {/* <div>
                      <p className="font-medium line-clamp-1">{item.name}</p>
                      {item.variant && (
                        <p className="text-xs text-gray-500">{item.variant}</p>
                      )}
                    </div> */}
                </TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  <PriceFormatter
                    className="text-black font-semibold"
                    amount={item.price * item.quantity}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            {order.discountAmount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Discount:</strong>
                <PriceFormatter amount={order.discountAmount} />
              </div>
            )}
            {order.subtotalAmount !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Subtotal:</strong>
                <PriceFormatter
                  amount={subtotalAmount + (order.discountAmount as number)}
                />
              </div>
            )}
            {order.shippingFee !== 0 && (
              <div className="w-full flex items-center justify-between">
                <strong>Shipping: </strong>
                <PriceFormatter amount={order.shippingFee} />
              </div>
            )}
            <div className="w-full flex items-center justify-between">
              <strong>Total:</strong>
              <PriceFormatter amount={order.totalAmount} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
