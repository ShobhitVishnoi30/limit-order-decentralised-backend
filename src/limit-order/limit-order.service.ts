import { Injectable, Logger } from '@nestjs/common';
import { LimitOrder } from 'src/shared/limit-order.interface';
import fetch from 'cross-fetch';
import { checkArray } from 'src/helper/common';
import { OrderStatus, UserOrderFilter } from 'src/dto/user-fliter.dto';
import * as httphelper from '../shared/http-helper';
import { apiResponse } from 'src/shared/api-response-instance';

@Injectable()
export class LimitOrderService {
  private logger = new Logger('TaskService', { timestamp: true });

  private readonly graphBaseUrl: string;
  constructor() {
    this.graphBaseUrl = process.env.SUBGRAPH_BASEURL;
  }

  async getAllLimitOrders(): Promise<apiResponse> {
    let limitOrdersData;
    try {
      const limitOrdersQuery = {
        query: `{
                limitOrders(orderBy: id) {
                    id
                    userAddress
                    inputTokenAddress
                    inputTokenAmount
                    outputTokenAddress
                    outputTokenAmount
                    limitOrderType
                    status
                  }
            }`,
      };

      limitOrdersData = await fetch(this.graphBaseUrl, {
        method: 'POST',
        body: JSON.stringify(limitOrdersQuery),
      })
        .then((res) => res.json())
        .then((resJson) => {
          return resJson?.data?.limitOrders;
        });
    } catch (e) {
      httphelper.errorResponse(e);
    }
    if (checkArray(limitOrdersData)) {
      return httphelper.successResponse(limitOrdersData, 200);
    } else {
      return httphelper.noDataFoundReponse();
    }
  }

  async getLimitOrder(
    userAddress: string,
    userOrderFilter: UserOrderFilter,
  ): Promise<apiResponse> {
    let limitOrdersData;
    try {
      let limitOrdersQuery;
      if (!userOrderFilter.status) {
        limitOrdersQuery = {
          query: `{
                      limitOrders(where:{userAddress:"${userAddress}"}) {
                          id
                          userAddress
                          inputTokenAddress
                          inputTokenAmount
                          outputTokenAddress
                          outputTokenAmount
                          limitOrderType
                          status
                        }
                  }`,
        };
      } else {
        limitOrdersQuery = {
          query: `{
                      limitOrders(where:{userAddress:"${userAddress}",status:${userOrderFilter.status}}) {
                          id
                          userAddress
                          inputTokenAddress
                          inputTokenAmount
                          outputTokenAddress
                          outputTokenAmount
                          limitOrderType
                          status
                        }
                  }`,
        };
      }

      limitOrdersData = await fetch(this.graphBaseUrl, {
        method: 'POST',
        body: JSON.stringify(limitOrdersQuery),
      })
        .then((res) => res.json())
        .then((resJson) => {
          return resJson?.data?.limitOrders;
        });
    } catch (e) {
      httphelper.errorResponse(e);
    }
    if (checkArray(limitOrdersData)) {
      return httphelper.successResponse(limitOrdersData, 200);
    } else {
      return httphelper.noDataFoundReponse();
    }
  }

  async filterLimitOrder(
    inputTokenAddress: string,
    outputTokenAddress: string,
    minPrice: number,
    maxPrice: number,
    status: number,
  ): Promise<LimitOrder[]> {
    let limitOrdersQuery;
    let currentTimeStamp = Math.floor(Date.now() / 1000);
    limitOrdersQuery = {
      query: `{
                      limitOrders(where:{inputTokenAddress_in:["${inputTokenAddress}","${outputTokenAddress}"],outputTokenAddress_in:["${outputTokenAddress}","${inputTokenAddress}"],price_gte:${minPrice},price_lte:${maxPrice},status:${status},timestamp:${currentTimeStamp}}) {
                          id
                          userAddress
                          inputTokenAddress
                          inputTokenAmount
                          outputTokenAddress
                          outputTokenAmount
                          limitOrderType
                          inBoundToken
                          status
                        }
                  }`,
    };

    const limitOrdersData = await fetch(this.graphBaseUrl, {
      method: 'POST',
      body: JSON.stringify(limitOrdersQuery),
    })
      .then((res) => res.json())
      .then((resJson) => {
        return resJson?.data?.limitOrders;
      });

    return checkArray(limitOrdersData) ? limitOrdersData : [];
  }
}
