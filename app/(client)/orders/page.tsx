import Container from "@/components/Container";
import OrdersComponent from "@/components/OrdersComponent";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyOrders } from "@/sanity/helpers/queries";
import { auth } from "@clerk/nextjs/server";
import { FileX } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const OrdersPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/");
  }
  const orders = await getMyOrders(userId);

  return (
    <Container className="py-10">
      {orders?.length ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Order List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w=full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto font-semibold text-gray-600">
                      Order ID
                    </TableHead>
                    <TableHead className="font-semibold text-gray-600">
                      Date
                    </TableHead>
                    <TableHead className="hidden lg:table-cell font-semibold text-gray-600">
                      Customer Name
                    </TableHead>
                    <TableHead className="hidden md:table-cell font-semibold text-gray-600">
                      Email
                    </TableHead>
                    <TableHead className="hidden lg:table-cell font-semibold text-gray-600">
                      Delivery Address
                    </TableHead>
                    <TableHead className="font-semibold text-gray-600">
                      Total
                    </TableHead>
                    <TableHead className="font-semibold text-gray-600">
                      Order Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <OrdersComponent orders={orders} />
                <ScrollBar orientation="horizontal" />
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col justify-center items-center py-5 md:py-10 px-4">
          <FileX className="h-24 w-24 text-gray-400 mb-4" />
          <Title>No orders found</Title>
          <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
            It looks like you haven&apos;t placed any orders yet. Start shopping
            and explore our products to create an order.
          </p>
          <Button asChild className="mt-6">
            <Link href={"/"}>Browse Products</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default OrdersPage;
