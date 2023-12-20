import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, test } from 'vitest';

import { useLoginStore } from '@/store/loginStore';

let store: any;

describe('loginStore', () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    store = useLoginStore();
  });

  describe('Successful API calls', () => {
    test.todo('login');
  });

  describe('Unsuccessful API calls', () => {
    test.todo('login');
  });
});
