import React, {useState} from 'react';
import {MealMut, MealType} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  onSubmit: (meal: MealMut) => void;
  loading: boolean;
}

const MealForm: React.FC<Props> = ({onSubmit, loading}) => {
  const [meal, setMeal] = useState<MealType>({
    type: '',
    description: '',
    calories: '',
  });

  const onMealChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setMeal(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...meal,
      calories: parseFloat(meal.calories),
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>Add new meal</h4>
      <select
        className="form-select mb-3"
        name="type"
        value={meal.type}
        onChange={onMealChange}
        required
      >
        <option disabled value="">Select!</option>
        <option value="breakfast">Breakfast</option>
        <option value="snack">Snack</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description" name="description"
          className="form-control" required
          value={meal.description}
          onChange={onMealChange}
        />
      </div>
      <div className="form-group my-2">
        <label htmlFor="image">Calories</label>
        <div className="d-flex justify-content-around">
          <input
            id="calories" name="calories" type="number"
            className="form-control" required
            value={meal.calories}
            onChange={onMealChange}
          />
          <p className="m-1 py-1">kcal</p>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {loading ? <ButtonSpinner/> : ''}
        Add
      </button>
    </form>
  );
};

export default MealForm;