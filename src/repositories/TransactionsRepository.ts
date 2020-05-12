import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter((transaction: Transaction) => transaction.type === 'income')
      .map((transaction: Transaction) => transaction.value)
      .reduce((acc, value) => {
        const accumulator = acc + value;
        return accumulator;
      }, 0);
    const outcome = this.transactions
      .filter((transaction: Transaction) => transaction.type === 'outcome')
      .map((transaction: Transaction) => transaction.value)
      .reduce((acc, value) => {
        const accumulator = acc + value;
        return accumulator;
      }, 0);
    const total = income - outcome;
    const balance = { income, outcome, total };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
