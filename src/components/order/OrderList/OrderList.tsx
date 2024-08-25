import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { Spinner, ErrorMessage } from '@/components/ui';
import useOrders from '@/hooks/orders/use-orders';
import formatPrice from '@/utils/formatPrice';
import { formatDate } from '@/utils/helpers';
import { Order } from '@/types';

import styles from './OrderList.module.css';

const OrderList = () => {
  const { data, isLoading, error } = useOrders();

  useEffect(() => {
    if (data) {
      console.log('Orders data:', data);
    }
  }, [data]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const orders = data || [];

  if (isLoading) {
    return <Spinner size={40} />;
  }

  return (
    <div className={styles.ordersContainer}>
      {orders.length > 0 ? (
        orders.map((order: Order) => (
          <div key={order._id} className={styles.orderCard}>
            {order.items.map((orderItem) => {
              const imageUrl =
                Array.isArray(orderItem.product.images) && orderItem.product.images.length > 0
                  ? orderItem.product.images[0]
                  : ''; // Default to an empty string if no images are found

              return (
                <div key={orderItem.product._id} className={styles.productCard}>
                  {/* Image Section */}
                  <Link href={`/products/${orderItem.product._id}`}>
                    <Image
                      src={imageUrl}
                      alt={orderItem.product.name}
                      width={100}
                      height={100}
                      className={styles.productImage}
                    />
                  </Link>

                  {/* Details Section */}
                  <div className={styles.productDetails}>
                    <Link href={`/products/${orderItem.product._id}`}>
                      <div className={styles.productName}>{orderItem.product.name}</div>
                    </Link>
                    <div className={styles.orderInfo}>
                      <div className={styles.orderNumber}>Order #{order._id}</div>
                      <div className={styles.orderStatus}>
                        {order.deliveryStatus === 'delivered' ? 'DELIVERED' : order.deliveryStatus.toUpperCase()}
                      </div>
                      <div className={styles.orderDate}>Placed on {formatDate(order.createdAt)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={styles.orderFooter}>
              <div className={styles.orderTotal}>
                Total: {formatPrice(order.total)}
              </div>
              
            </div>
          </div>
        ))
      ) : (
        <div className={styles.msg}>You have no orders yet.</div>
      )}
    </div>
  );
};

export default OrderList;
