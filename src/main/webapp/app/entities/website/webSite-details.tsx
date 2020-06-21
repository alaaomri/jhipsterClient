import { Link, RouteComponentProps } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { getEntity } from 'app/entities/website/webSite.reducer';


export interface IWebSiteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const WebSiteDetails = (props: IWebSiteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);
  const { webSiteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate
            contentKey="website.detail.title">WebSite</Translate> [<b>{webSiteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="website.fields.name">Name</Translate>
            </span>
          </dt>
          <dd>{webSiteEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="website.fields.description">Description</Translate>
            </span>
          </dt>
          <dd>{webSiteEntity.description}</dd>
          <dt>
            <span id="url">
              <Translate contentKey="website.fields.url">Url</Translate>
            </span>
          </dt>
          <dd>{webSiteEntity.url}</dd>
          <dt>
            <span id="userAgent">
              <Translate contentKey="website.fields.userAgent">User Agent(Navigator)</Translate>
            </span>
          </dt>
          <dd>{webSiteEntity.userAgent}</dd>
          <dt>
            <span id="holdingTag">
              <Translate contentKey="website.fields.holdingTag">Url</Translate>
            </span>
          </dt>
          <dd>{webSiteEntity.holdingTag}</dd>
        </dl>
        <Button tag={Link} to="/websites" replace color="info">
          <FontAwesomeIcon icon="arrow-left"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/websites/${webSiteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt"/>{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ webSite }: IRootState) => ({
  webSiteEntity: webSite.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebSiteDetails);
