import React, { useEffect, useContext } from 'react';
import Header from '../Header/Header';
import { ReactComponent as ArrowBack } from '../../assets/images/arrowback.svg';
import { Link } from 'react-router-dom';
import GradeBlock from '../GradeBook/GradeBlock';
import '../../styles/GradeBook.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import GradeService from '../../services/GradeService';

const GradeBook: React.FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    const fetchGrades = async () => {
      const profileId = store.getProfileId();
      console.log('Profile ID:', profileId); // Лог для проверки profileId

      if (profileId) {
        try {
          const response = await GradeService.fetchGrades(profileId); // Используем метод из GradeService
          console.log('Grades response:', response.data); // Лог для проверки данных
          store.setGrades(response.data);
        } catch (error) {
          console.error('Failed to fetch grades:', error);
        }
      }
    };

    fetchGrades();
  }, [store]);

  return (
    <div>
      <Header />
      <div className='hello'>
        <div id='hello'>Залікова книжка :</div>
        <div id='semestr'>1 2 3 4 5 6 7 8 9 10 11 12</div>
        <Link to='/'>
          <div className='back'>
            <ArrowBack />
            Назад
          </div>
        </Link>
      </div>
      <div className='BlockRating'>
        <div id='BlockRating'>
          <div className='RatingMember' id='RatingHead'>
            <div id='number'>N</div>
            <div id='discipline'>Дисципліна</div>
            <div id='contact'>Контакт</div>
            <div id='teacher'>Викладач</div>
            <div id='ez'>Е\З</div>
            <div id='mark'>Оцінка</div>
            <div id='nacGrade'>Нац</div>
            <div id='ects'>ECTS</div>
          </div>
          {store.grades.length > 0 ? (
            store.grades.map((grade, index) => (
              <GradeBlock
                key={grade._id}
                number={index + 1}
                nameLesson={grade.nameLesson}
                nameTeacher={grade.nameTeacher}
                contact={grade.contact}
                ez={grade.ez}
                grade={grade.grade}
                nation={grade.nation}
                ects={grade.ects}
              />
            ))
          ) : (
            <div>No grades found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(GradeBook);
