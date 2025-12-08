"use client"

import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/data';
import { deleteCartitemsApi, updateCartitemsApi } from '@/api-endpoints/CartsApi';
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface CartItemProps {
  // product: Product;
  product: any;
  quantity: number;
  onChange: any;
}

export default function CartItem({ product, quantity: initialQuantity, onChange }: CartItemProps) {
  const queryClient = useQueryClient();

  const handleUpdateCart = async (id: any, type: any, qty: any) => {
    try {
      if (qty === 1) {
        const updateApi = await deleteCartitemsApi(`${id}`)
        if (updateApi) {
          queryClient.invalidateQueries(['getCartitemsData'] as InvalidateQueryFilters);
          onChange();
        }
      } else {
        const response = await updateCartitemsApi(`${id}/${type}/`)
        if (response) {
          queryClient.invalidateQueries(['getCartitemsData'] as InvalidateQueryFilters);
          onChange();
        }
      }

    } catch (error) {

    }
  }
  const handleRemoveItem = async (id: any) => {
    try {
      const updateApi = await deleteCartitemsApi(`${id}`)
      if (updateApi) {
        queryClient.invalidateQueries(['getCartitemsData'] as InvalidateQueryFilters);
        onChange();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
      <div className="w-full sm:w-24 h-24 bg-white rounded-md overflow-hidden flex-shrink-0">
        <img
          src={
            product?.image_urls?.[0] ||
            product?.product_variant_image_urls?.[0] ||
            "https://semantic-ui.com/images/wireframe/image.png"
          }
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium"> {product?.name || product?.product_variant_title || product?.product_size || ''}</h3>
            {product.variants && product.variants.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Size: {product.variants[0].size}
              </p>
            )}
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"
            onClick={() => handleRemoveItem(product?.cartId)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => handleUpdateCart(product?.cartId, 'decrease', product?.cartQty)}
            // disabled={product?.cartQty <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <div className="w-10 text-center text-sm font-medium">
              {product?.cartQty}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => handleUpdateCart(product?.cartId, 'increase', '')}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="font-semibold">
            {formatPrice(product?.price * product?.cartQty)}
          </div>
        </div>
      </div>
    </div>
  );
}