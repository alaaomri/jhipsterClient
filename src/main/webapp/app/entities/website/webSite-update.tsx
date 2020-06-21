import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createEntity, getEntities, getEntity, reset, updateEntity } from 'app/entities/website/webSite.reducer';
import { IRootState } from 'app/shared/reducers';
import { Button, Col, Label, Row } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IWebSiteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const WebSiteCreateOrUpdate = (props: IWebSiteUpdateProps) => {

  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { webSiteEntity, entities, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/websites');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEntities();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...webSiteEntity,
        ...values
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
          <h2 id="website.home.createOrEditLabel">
            <Translate contentKey="website.home.createOrEditLabel">Create or edit a WebSite</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : webSiteEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="website-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="website-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="website-name">
                  <Translate contentKey="website.fields.name">Name</Translate>
                </Label>
                <AvInput id="website-name" type="text" className="form-control" name="name" validate={{
                  required: { value: true, errorMessage: translate('entity.validation.required') },
                  minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) }
                }}/>
              </AvGroup>
              <AvGroup>
                <Label for="website-description">
                  <Translate contentKey="website.fields.description">Description</Translate>
                </Label>
                <AvInput id="website-description" type="text" className="form-control" name="description" validate={{
                  required: { value: true, errorMessage: translate('entity.validation.required') },
                  minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) }
                }}/>
              </AvGroup>
              <AvGroup>
                <Label for="website-url">
                  <Translate contentKey="website.fields.url">Url</Translate>
                </Label>
                <AvInput id="website-url" type="text" className="form-control" name="url" validate={{
                  required: { value: true, errorMessage: translate('entity.validation.required') },
                  minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) }
                }}/>
              </AvGroup>
              <AvGroup>
                <Label for="website-userAgent">
                  <Translate contentKey="website.fields.userAgent">User Agent/Navigator</Translate>
                </Label>
                <AvInput id="website-userAgent" type="text" className="form-control" name="userAgent" validate={{
                  required: { value: true, errorMessage: translate('entity.validation.required') },
                  minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) }
                }}/>
              </AvGroup>
              <AvGroup>
                <Label for="website-holdingTag">
                  <Translate contentKey="website.fields.holdingTag">Tag</Translate>
                </Label>
                <AvInput id="website-holdingTag" type="text" className="form-control" name="holdingTag" validate={{
                  required: { value: true, errorMessage: translate('entity.validation.required') },
                  minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) }
                }}/>
              </AvGroup>

              <Button tag={Link} id="cancel-save" to="/websites" replace color="info">
                <FontAwesomeIcon icon="arrow-left"/>
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save"/>
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

const mapStateToProps = ({ webSite }: IRootState) => ({
  entities: webSite.entities,
  webSiteEntity: webSite.entity,
  loading: webSite.loading,
  updating: webSite.updating,
  updateSuccess: webSite.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebSiteCreateOrUpdate);
