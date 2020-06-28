import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap';
import { AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getSubjects } from 'app/entities/subject/subject.reducer';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntities as getQuestions } from 'app/entities/question/question.reducer';
import { createEntity, getEntity, reset, updateEntity } from './quiz.reducer';

export interface IQuizUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuizUpdate = (props: IQuizUpdateProps) => {
  const [subjectId, setSubjectId] = useState('0');
  const [customerId, setCustomerId] = useState('0');
  const [questionId, setQuestionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { quizEntity, subjects, customers, questions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/quiz' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getSubjects();
    props.getCustomers();
    props.getQuestions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...quizEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterClientApp.quiz.home.createOrEditLabel">
            <Translate contentKey="jhipsterClientApp.quiz.home.createOrEditLabel">Create or edit a Quiz</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : quizEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="quiz-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="quiz-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quizNameLabel" for="quiz-quizName">
                  <Translate contentKey="jhipsterClientApp.quiz.quizName">Quiz Name</Translate>
                </Label>
                <AvField
                  id="quiz-quizName"
                  type="text"
                  name="quizName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="quiz-code">
                  <Translate contentKey="jhipsterClientApp.quiz.code">Code</Translate>
                </Label>
                <AvField
                  id="quiz-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="timeBeginLabel" for="quiz-timeBegin">
                  <Translate contentKey="jhipsterClientApp.quiz.timeBegin">Time Begin</Translate>
                </Label>
                <AvField
                  id="quiz-timeBegin"
                  type="date"
                  className="form-control"
                  name="timeBegin"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="timeEndLabel" for="quiz-timeEnd">
                  <Translate contentKey="jhipsterClientApp.quiz.timeEnd">Time End</Translate>
                </Label>
                <AvField
                  id="quiz-timeEnd"
                  type="date"
                  className="form-control"
                  name="timeEnd"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="durationLabel" for="quiz-duration">
                  <Translate contentKey="jhipsterClientApp.quiz.duration">Duration</Translate>
                </Label>
                <AvField
                  id="quiz-duration"
                  type="string"
                  className="form-control"
                  name="duration"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="quiz-subject">
                  <Translate contentKey="jhipsterClientApp.quiz.subject">Subject</Translate>
                </Label>
                <AvInput id="quiz-subject" type="select" className="form-control" name="subjectId">
                  <option value="" key="0" />
                  {subjects
                    ? subjects.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.subjectName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/quiz" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  subjects: storeState.subject.entities,
  customers: storeState.customer.entities,
  questions: storeState.question.entities,
  quizEntity: storeState.quiz.entity,
  loading: storeState.quiz.loading,
  updating: storeState.quiz.updating,
  updateSuccess: storeState.quiz.updateSuccess,
});

const mapDispatchToProps = {
  getSubjects,
  getCustomers,
  getQuestions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuizUpdate);
