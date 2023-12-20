// import About from '@/views/About.vue';
import EndorserServiceUi from '@/views/EndorserServiceUi.vue';
import Connections from '@/views/Connections.vue';
import Transactions from '@/views/Transactions.vue';
import AllowCredDef from '@/views/AllowCredDef.vue';
import AllowDid from '@/views/AllowDid.vue';
import AllowSchema from '@/views/AllowSchema.vue';
import AllowConfig from '@/views/AllowConfig.vue';
import Home from '@/views/Home.vue';
import ServerConfig from '@/views/ServerConfig.vue';

const endorserRoutes = [
  {
    path: '/',
    name: 'EndorserServiceUi',
    component: EndorserServiceUi,
    children: [
      { path: 'home', name: 'Home', component: Home },

      // Connections
      {
        path: 'connections',
        name: 'Connections',
        component: Connections,
      },

      // Transactions
      {
        path: 'transactions',
        name: 'Transactions',
        component: Transactions,
      },

      // Allow
      {
        path: 'allow',
        children: [
          {
            path: 'credDef',
            name: 'AllowCredDef',
            component: AllowCredDef,
          },
          {
            path: 'did',
            name: 'AllowDid',
            component: AllowDid,
          },
          {
            path: 'schema',
            name: 'AllowSchema',
            component: AllowSchema,
          },
          {
            path: 'config',
            name: 'AllowConfig',
            component: AllowConfig,
          },
        ],
      },

      // Server Config
      {
        path: 'server',
        name: 'ServerConfig',
        component: ServerConfig,
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

export default endorserRoutes;
