import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap';
import { AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getQuestions } from 'app/entities/question/question.reducer';
import { getEntities as getSubjects } from 'app/entities/subject/subject.reducer';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { createEntity, getEntity, reset, updateEntity } from './quiz.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuizUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const QuizUpdate = (props: IQuizUpdateProps) => {
  const [idsquestion, setIdsquestion] = useState([]);
  const [idssubject, setIdssubject] = useState([]);
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { quizEntity, questions, subjects, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/quiz' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getQuestions();
    props.getSubjects();
    props.getCustomers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.timeBegin = convertDateTimeToServer(values.timeBegin);
    values.timeEnd = convertDateTimeToServer(values.timeEnd);

    if (errors.length === 0) {
      const entity = {
        ...quizEntity,
        ...values,
        questions: mapIdList(values.questions),
        subjects: mapIdList(values.subjects),
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
                <AvInput
                  id="quiz-timeBegin"
                  type="datetime-local"
                  className="form-control"
                  name="timeBegin"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.quizEntity.timeBegin)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="timeEndLabel" for="quiz-timeEnd">
                  <Translate contentKey="jhipsterClientApp.quiz.timeEnd">Time End</Translate>
                </Label>
                <AvInput
                  id="quiz-timeEnd"
                  type="datetime-local"
                  className="form-control"
                  name="timeEnd"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.quizEntity.timeEnd)}
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
                <Label for="quiz-question">
                  <Translate contentKey="jhipsterClientApp.quiz.question">Question</Translate>
                </Label>
                <AvInput
                  id="quiz-question"
                  type="select"
                  multiple
                  className="form-control"
                  name="questions"
                  value={quizEntity.questions && quizEntity.questions.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {questions
                    ? questions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.code}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="quiz-subject">
                  <Translate contentKey="jhipsterClientApp.quiz.subject">Subject</Translate>
                </Label>
                <AvInput
                  id="quiz-subject"
                  type="select"
                  multiple
                  className="form-control"
                  name="subjects"
                  value={quizEntity.subjects && quizEntity.subjects.map(e => e.id)}
                >
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
  questions: storeState.question.entities,
  subjects: storeState.subject.entities,
  customers: storeState.customer.entities,
  quizEntity: storeState.quiz.entity,
  loading: storeState.quiz.loading,
  updating: storeState.quiz.updating,
  updateSuccess: storeState.quiz.updateSuccess,
});

const mapDispatchToProps = {
  getQuestions,
  getSubjects,
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuizUpdate);
