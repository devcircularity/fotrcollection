import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Spinner, ErrorMessage } from '@/components/ui';
import useOrders from '@/hooks/orders/use-orders';
import formatPrice from '@/utils/formatPrice';
import { formatDate } from '@/utils/helpers';
import { Order } from '@/types';

import styles from './OrderList.module.css';

const OrderList = () => {
  const { data, isLoading, error } = useOrders();

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const orders = data || [];

  if (isLoading) {
    return <Spinner size={40} />;
  }

  return (
    <div>
      {orders.length > 0 ? (
        <ul className={styles.ordersContainer}>
          {orders.map((order: Order) => (
            <li key={order._id} className={styles.list}>
              <div>
                <div className={styles.date}>
                  Date Ordered:
                  <span className={styles.dateText}>{formatDate(order.createdAt)}</span>
                </div>
                <div className="products">
                  {order.items.map((orderItem) => (
                    <div key={orderItem.product._id} className={styles.productList}>
                      <div className={styles.productWrapper}>
                        <Link href={`/products/${orderItem.product._id}`}>
                          <Image
                            src={orderItem.product.imageURL}
                            alt={orderItem.product.name}
                            width={150}
                            height={150}
                          />
                        </Link>

                        <div className={styles.productInfo}>
                          <div>
                            <Link href={`/products/${orderItem.product._id}`}>
                              <div className={styles.productName}>{orderItem.product.name}</div>
                            </Link>
                            <div className={styles.productQuantity}>x {orderItem.quantity}</div>
                          </div>
                          <div className={styles.productPrice}>
                            {formatPrice(orderItem.product.price * orderItem.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.orderBottom}>
                  <span className={styles.totalText}>Order Total:</span>
                  <span className={styles.totalPrice}>{formatPrice(order.total)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.msg}> You have no orders yet.</div>
      )}
    </div>
  );
};

export default OrderList;
