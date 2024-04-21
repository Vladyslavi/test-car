import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addFavorites, removeFavorites } from 'redux/favorites/slice';
import {
  Item,
  ImageContainer,
  Img,
  HeartBtn,
  SvgHeartEmpty,
  SvgHeart,
  Title,
  Span,
  SpanPrice,
  TextAboutContainer,
  TextAbout,
} from './AdvertsItems.styled';
import Buttons from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import CarInfo from 'components/CarInfo/CarInfo';
const defaultImageURL = '../../img/unknown-vehicle.png';

const AdvertsItems = ({ carAdverts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    if (carAdverts) {
      const isAlreadyFavorite = favorites.some(
        favorite => favorite.id === carAdverts.id
      );
      setIsFavorite(isAlreadyFavorite);
    }
  }, [favorites, carAdverts]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleFavorite = () => {
    if (isFavorite && carAdverts) {
      dispatch(removeFavorites(carAdverts.id));
      toast.warning('removed from favorites.');
    } else if (carAdverts) {
      dispatch(addFavorites(carAdverts));
      toast.success('added to favorites.');
    }
    setIsFavorite(!isFavorite);
  };

  return carAdverts ? (
    <Item>
      <ImageContainer>
        <Img src={carAdverts.img || defaultImageURL} alt={carAdverts.make} width={274} />
        <HeartBtn onClick={toggleFavorite}>
          {isFavorite ? <SvgHeart /> : <SvgHeartEmpty />}
        </HeartBtn>
      </ImageContainer>
      <Title>
        {carAdverts.make}
        {carAdverts.make.length <= 9 && <Span>{carAdverts.model}</Span>}, {carAdverts.year}{' '}
        <SpanPrice>{carAdverts.rentalPrice}</SpanPrice>
      </Title>
      <TextAboutContainer>
        <TextAbout>
          {carAdverts.address.split(' ').slice(-2).join(' | ')} | {carAdverts.rentalCompany} | {carAdverts.type} | {carAdverts.make} | {carAdverts.mileage} |{' '}
          {carAdverts.functionalities[0]}
        </TextAbout>
      </TextAboutContainer>
      <Buttons onClick={() => toggleModal(carAdverts.id)} text="Learn More" />
      {isModalOpen && (
        <Modal openModal={toggleModal}>
          <CarInfo id={carAdverts.id} carAdverts={carAdverts} />
        </Modal>
      )}
    </Item>
  ) : null;
};

export default AdvertsItems;
