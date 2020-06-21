import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getEntities } from './webSite.reducer';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';

export interface IWebSiteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const WebSite = (props: IWebSiteProps) => {

  useEffect(() => {
    props.getEntities();
  }, []);
  const { webSiteList, match, loading } = props;
  return (
    <div>
      <h2 id="webSite-heading">
        WebSites
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus"/>
          &nbsp;
          Create new WebSite
        </Link>
      </h2>
      <div className="table-responsive">
        {webSiteList && webSiteList.length > 0 ? (

          <Table responsive>
            <thead>
            <tr>
              <th className="hand">
                <Translate contentKey="website.fields.id">ID</Translate>
              </th>
              <th className="hand">
                <Translate contentKey="website.fields.name">Name</Translate>
              </th>
              <th className="hand">
                <Translate contentKey="website.fields.url">Url</Translate>
              </th>
              <th className="hand">
                <Translate contentKey="website.fields.userAgent">User Agent</Translate>
              </th>
              <th className="hand">
                <Translate contentKey="website.fields.holdingTag">holding Tag</Translate>
              </th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {webSiteList.map((webSite, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  {webSite.id}
                </td>
                <td>{webSite.name}</td>
                <td>{webSite.url}</td>
                <td>{webSite.userAgent}</td>
                <td>{webSite.holdingTag}</td>
                <td>
                  <Button tag={Link} to={`${match.url}/${webSite.id}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye"/>{' '}
                    <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${webSite.id}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt"/>{' '}
                    <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${webSite.id}/delete`} color="danger" size="sm">
                    <FontAwesomeIcon icon="trash"/>{' '}
                    <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                  </Button>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              No WebSite found
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ webSite }: IRootState) => ({
  webSiteList: webSite.entities,
  loading: webSite.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebSite);
