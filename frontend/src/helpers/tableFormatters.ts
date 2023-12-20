import { Ref } from 'vue';
import { formatDateLong } from '.';

export const formatConnections = (connections: Ref<any[]>): any[] =>
  connections.value.map((connection: any) => ({
    connection_id: connection.connection_id,
    state: connection.state,
    their_label: connection.their_label,
    author_status: connection.author_status,
    endorse_status: connection.endorse_status,
    created: formatDateLong(connection.created_at),
    updated: formatDateLong(connection.updated_at),
  }));

export const formatCredDefs = (creds: Ref<any[]>): any[] =>
  creds.value.map((cred: any) => ({
    issuer_did: cred.issuer_did,
    author_did: cred.author_did,
    schema_name: cred.schema_name,
    version: cred.version,
    tag: cred.tag,
    rev_reg_def: cred.rev_reg_def,
    rev_reg_entry: cred.rev_reg_entry,
    allowed_cred_def_id: cred.allowed_cred_def_id,
    created: formatDateLong(cred.created_at),
    updated: formatDateLong(cred.updated_at),
  }));

export const formatDids = (dids: Ref<any[]>): any[] =>
  dids.value.map((did: any) => ({
    registered_did: did.registered_did,
    created: formatDateLong(did.created_at),
    updated: formatDateLong(did.updated_at),
  }));

export const formatSchemas = (schemas: Ref<any[]>): any[] =>
  schemas.value.map((schema: any) => ({
    author_did: schema.author_did,
    schema_name: schema.schema_name,
    version: schema.version,
    allowed_schema_id: schema.allowed_schema_id,
    created: formatDateLong(schema.created_at),
    updated: formatDateLong(schema.updated_at),
  }));

export const formatTransactions = (transactions: Ref<any[]>): any[] =>
  transactions.value.map((transaction: any) => ({
    transaction_id: transaction.transaction_id,
    connection_id: transaction.connection_id,
    state: transaction.state,
    author_did: transaction.author_did,
    transaction_type: transaction.transaction_type,
    created: formatDateLong(transaction.created_at),
  }));
