import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row } from 'reactstrap';
import { AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getQuizzes } from 'app/entities/quiz/quiz.reducer';
import { createEntity, getEntity, reset, updateEntity } from './subject.reducer';

export interface ISubjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubjectUpdate = (props: ISubjectUpdateProps) => {
  const [quizId, setQuizId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { subjectEntity, quizzes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/subject' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getQuizzes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...subjectEntity,
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
          <h2 id="jhipsterClientApp.subject.home.createOrEditLabel">
            <Translate contentKey="jhipsterClientApp.subject.home.createOrEditLabel">Create or edit a Subject</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : subjectEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="subject-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="subject-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="subject-code">
                  <Translate contentKey="jhipsterClientApp.subject.code">Code</Translate>
                </Label>
                <AvField
                  id="subject-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="subjectNameLabel" for="subject-subjectName">
                  <Translate contentKey="jhipsterClientApp.subject.subjectName">Subject Name</Translate>
                </Label>
                <AvField
                  id="subject-subjectName"
                  type="text"
                  name="subjectName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/subject" replace color="info">
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
  quizzes: storeState.quiz.entities,
  subjectEntity: storeState.subject.entity,
  loading: storeState.subject.loading,
  updating: storeState.subject.updating,
  updateSuccess: storeState.subject.updateSuccess,
});

const mapDispatchToProps = {
  getQuizzes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubjectUpdate);
