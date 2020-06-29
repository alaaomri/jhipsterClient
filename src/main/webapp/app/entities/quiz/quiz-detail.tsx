import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './quiz.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';

export interface IQuizDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuizDetail = (props: IQuizDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { quizEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterClientApp.quiz.detail.title">Quiz</Translate> [<b>{quizEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quizName">
              <Translate contentKey="jhipsterClientApp.quiz.quizName">Quiz Name</Translate>
            </span>
          </dt>
          <dd>{quizEntity.quizName}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="jhipsterClientApp.quiz.code">Code</Translate>
            </span>
          </dt>
          <dd>{quizEntity.code}</dd>
          <dt>
            <span id="timeBegin">
              <Translate contentKey="jhipsterClientApp.quiz.timeBegin">Time Begin</Translate>
            </span>
          </dt>
          <dd>{quizEntity.timeBegin ? <TextFormat value={quizEntity.timeBegin} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="timeEnd">
              <Translate contentKey="jhipsterClientApp.quiz.timeEnd">Time End</Translate>
            </span>
          </dt>
          <dd>{quizEntity.timeEnd ? <TextFormat value={quizEntity.timeEnd} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="duration">
              <Translate contentKey="jhipsterClientApp.quiz.duration">Duration</Translate>
            </span>
          </dt>
          <dd>{quizEntity.duration}</dd>
          <dt>
            <Translate contentKey="jhipsterClientApp.quiz.question">Question</Translate>
          </dt>
          <dd>
            {quizEntity.questions
              ? quizEntity.questions.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.code}</a>
                    {quizEntity.questions && i === quizEntity.questions.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>
            <Translate contentKey="jhipsterClientApp.quiz.subject">Subject</Translate>
          </dt>
          <dd>
            {quizEntity.subjects
              ? quizEntity.subjects.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.subjectName}</a>
                    {quizEntity.subjects && i === quizEntity.subjects.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/quiz" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/quiz/${quizEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ quiz }: IRootState) => ({
  quizEntity: quiz.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuizDetail);
