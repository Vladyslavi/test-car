import { useEffect } from 'react';
import { CatalogContainer, ResultMessage } from './Catalog.styled';
import FilteredForm from '../../components/FilteredForm/FilteredForm';
import AdvertsList from '../../components/AdvertsList/AdvertsList';
import { useDispatch, useSelector } from 'react-redux';
import { getcarAdverts } from '../../redux/carAdverts/selectors';
import { fetchAll } from '../../redux/carAdverts/operations';
import { ToastContainer } from 'react-toastify';
import { useCatalog } from '../../utils';

const Catalog = () => {
  const dispatch = useDispatch();
  const allcarAdverts = useSelector(getcarAdverts);
  const initialFilters = {
    make: '',
    filteredPrices: [],
    minMileage: '',
    maxMileage: '',
  };

  const {
    filters,
    filteredAdverts,
    isFiltering,
    handleFilterChange,
    handleResetClick,
  } = useCatalog(initialFilters, allcarAdverts);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const makes = [...new Set(allcarAdverts.map(carAdvert => carAdvert.make))];
  const prices = [
    ...new Set(allcarAdverts.map(carAdvert => {
      if (carAdvert.rentalPrice) {
        return parseFloat(carAdvert.rentalPrice.replace('$', ''));
      }
      return null;
    }).filter(price => price !== null))
  ];
  const mileage = [...new Set(allcarAdverts.map(carAdvert => carAdvert.mileage))];
  const minMileage = Math.min(...mileage);
  const maxMileage = Math.max(...mileage);

  return (
    <>
      <CatalogContainer>
        <FilteredForm
          makes={makes}
          prices={prices}
          minMileage={minMileage}
          maxMileage={maxMileage}
          onFilterChange={handleFilterChange}
          filters={filters}
          onResetClick={handleResetClick}
        />
        {isFiltering ? (
          filteredAdverts.length > 0 ? (
            <AdvertsList filteredAdverts={filteredAdverts} />
          ) : (
            <ResultMessage>
              No results.
            </ResultMessage>
          )
        ) : (
          <AdvertsList carAdverts={allcarAdverts} />
        )}
      </CatalogContainer>
      <ToastContainer />
    </>
  );
};

export default Catalog;