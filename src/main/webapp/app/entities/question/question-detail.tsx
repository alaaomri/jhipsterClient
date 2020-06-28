import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './question.reducer';

export interface IQuestionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuestionDetail = (props: IQuestionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { questionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterClientApp.question.detail.title">Question</Translate> [<b>{questionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="jhipsterClientApp.question.code">Code</Translate>
            </span>
          </dt>
          <dd>{questionEntity.code}</dd>
          <dt>
            <span id="question">
              <Translate contentKey="jhipsterClientApp.question.question">Question</Translate>
            </span>
          </dt>
          <dd>{questionEntity.question}</dd>
          <dt>
            <Translate contentKey="jhipsterClientApp.question.quiz">Quiz</Translate>
          </dt>
          <dd>
            {questionEntity.quizzes
              ? questionEntity.quizzes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.code}</a>
                    {questionEntity.quizzes && i === questionEntity.quizzes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/question" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/question/${questionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ question }: IRootState) => ({
  questionEntity: question.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);
