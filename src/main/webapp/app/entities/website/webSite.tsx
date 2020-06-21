import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getEntities } from './webSite.reducer';
import { getSortState, JhiItemCount, JhiPagination, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Table } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IWebSiteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const WebSite = (props: IWebSiteProps) => {

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  useEffect(() => {
    props.getEntities(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  }, [pagination.activePage, pagination.order, pagination.sort]);


  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1]
      });
    }
  }, [props.location.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage
    });

  const { webSiteList, match, loading, totalItems } = props;
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

      <Table responsive>
        <thead>
        <tr>
          <th className="hand" onClick={sort('id')}>
            <FontAwesomeIcon icon="sort"/>
            <Translate contentKey="website.fields.id">ID</Translate>
          </th>
          <th className="hand" onClick={sort('name')}>
            <FontAwesomeIcon icon="sort"/>
            <Translate contentKey="website.fields.name">Name</Translate>
          </th>
          <th className="hand" onClick={sort('description')}>
            <FontAwesomeIcon icon="sort"/>
            <Translate contentKey="website.fields.description">Description</Translate>
          </th>
          <th className="hand" onClick={sort('url')}>
            <FontAwesomeIcon icon="sort"/>
            <Translate contentKey="website.fields.url">Url</Translate>
          </th>
          <th className="hand" onClick={sort('userAgent')}>
            <FontAwesomeIcon icon="sort"/>
            <Translate contentKey="website.fields.userAgent">User Agent</Translate>
          </th>
          <th className="hand" onClick={sort('holdingTag')}>
            <FontAwesomeIcon icon="sort"/>
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
            <td>{webSite.description}</td>
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
              &nbsp;
              <Button tag={Link} to={`${match.url}/${webSite.id}/edit`} color="primary" size="sm">
                <FontAwesomeIcon icon="pencil-alt"/>{' '}
                <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
              </Button>
              &nbsp;
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

      <div className={webSiteList && webSiteList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage}
                        i18nEnabled/>
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={pagination.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={pagination.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = ({ webSite }: IRootState) => ({
  webSiteList: webSite.entities,
  totalItems: webSite.totalItems,
  loading: webSite.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WebSite);
