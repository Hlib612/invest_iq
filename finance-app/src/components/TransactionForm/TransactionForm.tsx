import { useState, type FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Calculator } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setTransactions } from '@/features/transactions/transactionsSlice';
import { selectTransactions } from '@/features/transactions/selectors';
import { addTransaction } from '@/services/mock/transactionsApi';
import type { ICategory, TransactionType } from '@/types';
import styles from './TransactionForm.module.scss';

// Категорії для вибору у формі
const CATEGORIES: ICategory[] = [
  { id: 'food', name: 'Продукти', type: 'expense', color: '#FF751D' },
  { id: 'transport', name: 'Транспорт', type: 'expense', color: '#FF751D' },
  { id: 'entertainment', name: 'Розваги', type: 'expense', color: '#FF751D' },
  { id: 'health', name: "Здоров'я", type: 'expense', color: '#FF751D' },
  { id: 'clothes', name: 'Одяг', type: 'expense', color: '#FF751D' },
  { id: 'utilities', name: 'Комунальні', type: 'expense', color: '#FF751D' },
  { id: 'sport', name: 'Спорт', type: 'expense', color: '#FF751D' },
  { id: 'cafe', name: 'Кафе', type: 'expense', color: '#FF751D' },
  { id: 'salary', name: 'ЗП', type: 'income', color: '#FF751D' },
  { id: 'extra-income', name: 'Дод. прибуток', type: 'income', color: '#FF751D' },
];

// Проста функція: залишає цифри, крапку/кому та розбиває тисячі пробілами
function formatAmountDisplay(rawText: string): string {
  let cleanText = '';

  for (let i = 0; i < rawText.length; i++) {
    const ch = rawText.charAt(i);
    if (ch >= '0' && ch <= '9') {
      cleanText += ch;
    } else if (ch === '.' || ch === ',') {
      if (!cleanText.includes('.')) {
        cleanText += '.';
      }
    }
  }

  if (cleanText === '') {
    return '';
  }

  const parts = cleanText.split('.');
  const wholePart = parts[0] ?? '';
  const rawCents = parts[1] ?? '';
  const centsPart = rawCents.slice(0, 2);

  let formattedWhole = '';
  let counter = 0;

  for (let i = wholePart.length - 1; i >= 0; i--) {
    formattedWhole = wholePart.charAt(i) + formattedWhole;
    counter++;
    if (counter === 3 && i !== 0) {
      formattedWhole = ' ' + formattedWhole;
      counter = 0;
    }
  }

  if (parts.length > 1) {
    return `${formattedWhole}.${centsPart}`;
  }

  return formattedWhole;
}

function parseAmountNumber(formattedText: string): number {
  const withoutSpaces = formattedText.split(' ').join('');
  const numberValue = Number(withoutSpaces);

  if (Number.isNaN(numberValue)) {
    return 0;
  }

  return numberValue;
}

export function TransactionForm() {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const activeTab: TransactionType = useAppSelector(
    (state) => state.transactions.activeTab,
  );

  // Стани полів форми
  const [date, setDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [amountText, setAmountText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredCategories = CATEGORIES.filter((item) => item.type === activeTab);

  const handleReset = () => {
    setDate(new Date());
    setDescription('');
    setCategoryId('');
    setAmountText('');
    setError('');
  };

  // Відправка форми
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const amount = parseAmountNumber(amountText);

    if (description.trim() === '') {
      setError('Введіть опис транзакції');
      return;
    }

    if (categoryId === '') {
      setError('Оберіть категорію');
      return;
    }

    if (amount <= 0) {
      setError('Сума має бути більшою за 0');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const selectedDate = date || new Date();

      const created = await addTransaction({
        amount,
        type: activeTab,
        categoryId,
        description: description.trim(),
        date: selectedDate.toISOString(),
      });

      dispatch(setTransactions([created, ...transactions]));
      handleReset();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Помилка додавання транзакції');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Рядок з полями: Дата, Опис, Категорія, Сума */}
      <div className={styles.row}>
        {/* Поле 1: Дата */}
        <div className={styles.dateBox}>
          <Calendar size={16} className={styles.iconMuted} />
          <DatePicker
            selected={date}
            onChange={(newDate: Date | null) => setDate(newDate)}
            dateFormat="dd.MM.yyyy"
          />
        </div>

        {/* Поле 2: Опис */}
        <input
          type="text"
          className={styles.input}
          placeholder={activeTab === 'expense' ? 'Опис товару' : 'Опис прибутку'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Поле 3: Категорія */}
        <select
          className={styles.select}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">
            {activeTab === 'expense' ? 'Категорія товару' : 'Категорія прибутку'}
          </option>
          {filteredCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Поле 4: Сума */}
        <div className={styles.amountBox}>
          <input
            type="text"
            inputMode="decimal"
            className={styles.amountInput}
            placeholder="0.00"
            value={amountText}
            onChange={(e) => setAmountText(formatAmountDisplay(e.target.value))}
          />
          <Calculator size={16} className={styles.iconMuted} />
        </div>
      </div>

      {/* Повідомлення про помилку, якщо щось не заповнено */}
      {error !== '' && <p className={styles.error}>{error}</p>}

      {/* Кнопки ВВЕСТИ та ОЧИСТИТИ */}
      <div className={styles.buttons}>
        <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Збереження...' : 'Ввести'}
        </button>

        <button type="button" className={styles.btnReset} onClick={handleReset}>
          Очистити
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
