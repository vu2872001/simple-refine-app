import { store } from '../redux/store';
import { stringify } from 'query-string';
import {
  getAllUsersFailed,
  getAllUsersStart,
  getAllUsersSuccess,
  getUserInfoFailed,
  getUserInfoStart,
  getUserInfoSuccess,
} from 'redux/usersSlice';

const mapOperator = (operator) => {
  switch (operator) {
    case 'ne':
    case 'gte':
    case 'lte':
      return `_${operator}`;
    case 'contains':
      return '_like';
    case 'eq':
    default:
      return '';
  }
};

const generateSort = (sort) => {
  if (sort && sort.length > 0) {
    const _sort = [];
    const _order = [];

    sort.map((item) => {
      _sort.push(item.field);
      _order.push(item.order);
    });

    return {
      _sort,
      _order,
    };
  }

  return;
};

const generateFilter = (filters) => {
  const queryFilters = {};
  if (filters) {
    filters.map((filter) => {
      if (filter.operator !== 'or') {
        const { field, operator, value } = filter;

        if (field === 'q') {
          queryFilters[field] = value;
          return;
        }

        const mappedOperator = mapOperator(operator);
        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });
  }

  return queryFilters;
};

export const dataProvider = (apiUrl, httpClient) => ({
  getList: async ({
    resource,
    hasPagination = true,
    pagination = { current: 1, pageSize: 10 },
  }) => {
    // debugger
    const url = `${apiUrl}/${resource}`;

    // const { current = 1, pageSize = 10 } = pagination ?? {};

    // const query = hasPagination
    //   ? {
    //       _start: (current - 1) * pageSize,
    //       _end: current * pageSize,
    //     }
    //   : {};

    // const { data, headers } = await httpClient.get(
    //     `${url}?${stringify(query)}`,
    // );

    store.dispatch(getAllUsersStart());
    try {
      const token = store.getState().auth.login.currentUser.access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      var { data } = await httpClient.get(`${url}`, config);
      store.dispatch(getAllUsersSuccess(data));
    } catch (error) {
      store.dispatch(getAllUsersFailed());
    }
    // const total = +headers["x-total-count"];
    return {
      data,
    };
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await httpClient.get(
      `${apiUrl}/${resource}?${stringify({ id: ids })}`
    );

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await httpClient.post(url, variables);

    return {
      data,
    };
  },

  createMany: async ({ resource, variables }) => {
    const response = await Promise.all(
      variables.map(async (param) => {
        const { data } = await httpClient.post(
          `${apiUrl}/${resource}`,
          param
        );
        return data;
      })
    );

    return { data: response };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.patch(url, variables);

    return {
      data,
    };
  },

  updateMany: async ({ resource, ids, variables }) => {
    const response = await Promise.all(
      ids.map(async (id) => {
        const { data } = await httpClient.patch(
          `${apiUrl}/${resource}/${id}`,
          variables
        );
        return data;
      })
    );

    return { data: response };
  },

  getOne: async ({ resource }) => {
    const url = `${apiUrl}/${resource}`;
    
    store.dispatch(getUserInfoStart());
    try {
      const token = store.getState().auth.login.currentUser.access;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      var { data } = await httpClient.get(`${url}`, config);
      store.dispatch(getUserInfoSuccess(data));
    } catch (error) {
      store.dispatch(getUserInfoFailed());
    }

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.delete(url, variables);

    return {
      data,
    };
  },

  deleteMany: async ({ resource, ids, variables }) => {
    const response = await Promise.all(
      ids.map(async (id) => {
        const { data } = await httpClient.delete(
          `${apiUrl}/${resource}/${id}`,
          variables
        );
        return data;
      })
    );
    return { data: response };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    filters,
    sort,
    payload,
    query,
    headers,
  }) => {
    let httpClientUrl = `${apiUrl}/${url}`;

    // if (sort) {
    //   const generatedSort = generateSort(sort);
    //   if (generatedSort) {
    //     const { _sort, _order } = generatedSort;
    //     const sortQuery = {
    //       _sort: _sort.join(","),
    //       _order: _order.join(","),
    //     };
    //     httpClientUrl = `${httpClientUrl}&${stringify(sortQuery)}`;
    //   }
    // }

    // if (filters) {
    //   const filterQuery = generateFilter(filters);
    //   httpClientUrl = `${httpClientUrl}&${stringify(filterQuery)}`;
    // }

    // if (query) {
    //   httpClientUrl = `${httpClientUrl}&${stringify(query)}`;
    // }

    // if (headers) {
    //   httpClient.defaults.headers = {
    //     ...httpClient.defaults.headers,
    //     ...headers,
    //   };
    // }

    const token = store.getState().auth.login.currentUser.access;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let axiosResponse;
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await httpClient[method](
          httpClientUrl,
          payload,
          config
        );
        break;
      case 'delete':
        axiosResponse = await httpClient.delete(
          httpClientUrl,
          config
        );
        break;
      default:
        axiosResponse = await httpClient.get(httpClientUrl, config);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
