import { stringify } from 'qs';
import request from '../utils/irequest';

export async function queryOrgList() {
    return request(`/v2/organizations`);
}

export async function createOrg(params) {
    try {
        const res = request('/v2/organizations', {
                method: 'POST',
                body: params,
            });

        return res;
    }
    catch (e) {
        throw e;
    }
    /*
    return request('/v2/organizations', {
        method: 'POST',
        body: params,
    });*/
}

export async function updateOrg(params) {
    return request(`/v2/organizations/${params.organization.id}`, {
        method:'PUT',
        body: params,
    });
}

export async function deleteOrg(params) {
    return request(`/v2/organizations/${params.orgid}`, {method:['DELETE']});
}

export async function searchOrgById(params) {
    return request(`/v2/organizations/${params.Id}`, {method:['GET']});
}

export async function searchOrgByName(params) {
    return request(`/api/search_org?${stringify(params)}`);
}
