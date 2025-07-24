import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Order } from "@/sanity.types";
import logoImage from "@/public/logo-base64";
import { format } from "date-fns";

export const generateInvoice = (order: Order) => {
  const doc = new jsPDF();

  // Optional Logo
  if (logoImage) {
    doc.addImage(logoImage, "PNG", 120, 10, 80, 18);
  }

  // Header Section
  doc.setFontSize(18);
  doc.text("Order Invoice", 14, 20);

  doc.setFontSize(10);
  doc.text(`Generated: ${format(new Date(), "dd/MM/yyyy")}`, 14, 26);

  doc.setFontSize(12);
  doc.text(`Order ID: ${order.orderId}`, 14, 36);
  doc.text(`Customer: ${order.customerName}`, 14, 44);
  doc.text(`Email: ${order.customerEmail}`, 14, 52);
  doc.text(`Delivery Address: ${order.deliveryAddress}`, 14, 60);
  doc.text(
    `Order Date: ${order.createdAt ? format(new Date(order.createdAt), "dd/MM/yyyy") : "-"}`,
    14,
    68
  );
  doc.text(`Status: ${order.status.toUpperCase()}`, 14, 76);
  doc.text(`Paid: ${order.paid ? "Yes" : "No"}`, 14, 84);

  // Items Table
  const tableBody =
    order.items?.map((item) => [
      item.name || "N/A",
      item.variant || "-",
      item.size || "-",
      item.quantity?.toString() ?? "1",
      `${Number(item.price ?? 0).toLocaleString()}`,
    ]) || [];

  autoTable(doc, {
    startY: 95,
    head: [["Product", "Variant", "Size", "Qty", "Price (NGN)"]],
    body: tableBody,
  });

  const finalY =
    (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable
      .finalY + 10;

  // Amount Summary Section
  doc.setFontSize(12);

  doc.setFont("helvetica", "bold");
  doc.text(
    `Subtotal: NGN ${(order.subtotalAmount ?? 0).toLocaleString()}`,
    14,
    finalY
  );

  doc.text(
    `Discount: NGN ${(order.discountAmount ?? 0).toLocaleString()}`,
    14,
    finalY + 8
  );

  doc.text(
    `Shipping Fee: NGN ${(order.shippingFee ?? 0).toLocaleString()}`,
    14,
    finalY + 16
  );

  // Total Amount (Bold and slightly larger)
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(
    `TOTAL: NGN ${(order.totalAmount ?? 0).toLocaleString()}`,
    14,
    finalY + 28
  );

  // Thank You Note
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for your order and trust in our brand!", 14, finalY + 45);

  // Save PDF
  doc.save(`Invoice-${order.orderId}.pdf`);
};
