import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetail = (props: ICustomerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterClientApp.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="gender">
              <Translate contentKey="jhipsterClientApp.customer.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{customerEntity.gender}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="jhipsterClientApp.customer.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{customerEntity.phone}</dd>
          <dt>
            <span id="birthDate">
              <Translate contentKey="jhipsterClientApp.customer.birthDate">Birth Date</Translate>
            </span>
          </dt>
          <dd>
            {customerEntity.birthDate ? <TextFormat value={customerEntity.birthDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="addressLine1">
              <Translate contentKey="jhipsterClientApp.customer.addressLine1">Address Line 1</Translate>
            </span>
          </dt>
          <dd>{customerEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">
              <Translate contentKey="jhipsterClientApp.customer.addressLine2">Address Line 2</Translate>
            </span>
          </dt>
          <dd>{customerEntity.addressLine2}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="jhipsterClientApp.customer.city">City</Translate>
            </span>
          </dt>
          <dd>{customerEntity.city}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="jhipsterClientApp.customer.country">Country</Translate>
            </span>
          </dt>
          <dd>{customerEntity.country}</dd>
          <dt>
            <Translate contentKey="jhipsterClientApp.customer.user">User</Translate>
          </dt>
          <dd>{customerEntity.userLogin ? customerEntity.userLogin : ''}</dd>
          <dt>
            <Translate contentKey="jhipsterClientApp.customer.quiz">Quiz</Translate>
          </dt>
          <dd>
            {customerEntity.quizzes
              ? customerEntity.quizzes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.code}</a>
                    {customerEntity.quizzes && i === customerEntity.quizzes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
