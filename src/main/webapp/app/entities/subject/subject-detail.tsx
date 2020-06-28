import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './subject.reducer';

export interface ISubjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubjectDetail = (props: ISubjectDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { subjectEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterClientApp.subject.detail.title">Subject</Translate> [<b>{subjectEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="jhipsterClientApp.subject.code">Code</Translate>
            </span>
          </dt>
          <dd>{subjectEntity.code}</dd>
          <dt>
            <span id="subjectName">
              <Translate contentKey="jhipsterClientApp.subject.subjectName">Subject Name</Translate>
            </span>
          </dt>
          <dd>{subjectEntity.subjectName}</dd>
        </dl>
        <Button tag={Link} to="/subject" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/subject/${subjectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ subject }: IRootState) => ({
  subjectEntity: subject.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDetail);
