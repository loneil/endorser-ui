// import About from '@/views/About.vue';
import InnkeeperUi from '@/views/InnkeeperUi.vue';
import InnkeeperTenants from '@/views/innkeeper/InnkeeperTenants.vue';
import Transactions from '@/views/Transactions.vue';
import AllowCredDef from '@/views/AllowCredDef.vue';
import AllowDid from '@/views/AllowDid.vue';
import AllowSchema from '@/views/AllowSchema.vue';
import AllowConfig from '@/views/AllowConfig.vue';

const innkeeperRoutes = [
  {
    path: '/innkeeper/',
    name: 'InnkeeperUi',
    component: InnkeeperUi,
    meta: { isInnkeeper: true },
    children: [
      {
        path: 'tenants',
        name: 'InnkeeperTenants',
        component: InnkeeperTenants,
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: Transactions,
      },

      // Allow
      {
        path: 'allow/credDef',
        name: 'AllowCredDef',
        component: AllowCredDef,
      },
      {
        path: 'allow/did',
        name: 'AllowDid',
        component: AllowDid,
      },
      {
        path: 'allow/schema',
        name: 'AllowSchema',
        component: AllowSchema,
      },
      {
        path: 'allow/config',
        name: 'AllowConfig',
        component: AllowConfig,
      },

      // About
      // {
      //   path: 'about',
      //   name: 'InnkeeperAbout',
      //   component: About,
      //   meta: { isInnkeeper: true },
      // },
    ],
  },
];

export default innkeeperRoutes;
