import { mapGetters } from 'vuex';
import numberFormatter from '@/helpers/numberFormatter';
import itemDeclination from '@/helpers/itemDeclination';

export default {
  filters: {
    numberFormatter,
    itemDeclination,
  },
  computed: {
    ...mapGetters({
      products: 'getProducts',
      total: 'totalPrice',
      amount: 'totalAmount',
    }),
  },
};
