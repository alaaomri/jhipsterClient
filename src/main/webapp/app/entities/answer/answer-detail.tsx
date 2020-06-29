import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './answer.reducer';

export interface IAnswerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AnswerDetail = (props: IAnswerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { answerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterClientApp.answer.detail.title">Answer</Translate> [<b>{answerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="jhipsterClientApp.answer.code">Code</Translate>
            </span>
          </dt>
          <dd>{answerEntity.code}</dd>
          <dt>
            <span id="answer">
              <Translate contentKey="jhipsterClientApp.answer.answer">Answer</Translate>
            </span>
          </dt>
          <dd>{answerEntity.answer}</dd>
          <dt>
            <Translate contentKey="jhipsterClientApp.answer.question">Question</Translate>
          </dt>
          <dd>
            {answerEntity.questions
              ? answerEntity.questions.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.code}</a>
                    {answerEntity.questions && i === answerEntity.questions.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/answer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/answer/${answerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ answer }: IRootState) => ({
  answerEntity: answer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AnswerDetail);
