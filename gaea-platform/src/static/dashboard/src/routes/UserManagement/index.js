/*
 SPDX-License-Identifier: Apache-2.0
*/
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { stringify } from 'qs';
import { Card, Divider, Button, Modal, Form, Input, Select, InputNumber, Switch, Icon } from 'antd';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import STable from 'components/StandardTableForNetWork';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import request from '../../utils/request';
import config from '../../utils/config';

import styles from './style.less';

const { urls } = config;
const FormItem = Form.Item;
const { Option } = Select;

const messages = defineMessages({
  title: {
    list: {
        id: 'UserManagement.Title.List',
        defaultMessage: 'User Management',
    },
    create: {
      id: 'UserManagement.Title.Create',
      defaultMessage: 'Create new user',
    },
    edit: {
      id: 'UserManagement.Title.Edit',
      defaultMessage: 'Edit user',
    },
  },
  button: {
    new: {
      id: 'UserManagement.Button.New',
      defaultMessage: 'New',
    },
    edit: {
      id: 'UserManagement.Button.Edit',
      defaultMessage: 'Edit',
    },
    delete: {
      id: 'UserManagement.Button.Delete',
      defaultMessage: 'Delete',
    },
  },
  label: {
    name: {
      id: 'UserManagement.Label.Name',
      defaultMessage: 'Name',
    },
    role: {
      id: 'UserManagement.Label.Role',
      defaultMessage: 'Role',
    },
    balance: {
      id: 'UserManagement.Label.Balance',
      defaultMessage: 'Balance',
    },
    operate: {
      id: 'UserManagement.Label.Operate',
      defaultMessage: 'Operate',
    },
    password: {
      id: 'UserManagement.Label.Password',
      defaultMessage: 'Password',
    },
    active: {
      id: 'UserManagement.Label.Active',
      defaultMessage: 'Active',
    },
    description: {
        id: 'UserManagement.Label.Description',
        defaultMessage: 'User list.',
    },
  },
  validate: {
    required: {
      name: {
        id: 'UserManagement.Validate.Required.Name',
        defaultMessage: 'Please input username',
      },
      password: {
        id: 'UserManagement.Validate.Required.Password',
        defaultMessage: 'Please input password',
      },
    },
    nameExists: {
      id: 'UserManagement.Validate.NameExists',
      defaultMessage: '{name} already exists.',
    },
  },
  confirm: {
    deleteUser: {
      id: 'UserManagement.Confirm.DeleteUser',
      defaultMessage: 'Do you confirm to delete user {name}',
    },
  },
});

const CreateForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleAdd,
    handleEdit,
    userActive,
    method,
    currentUser,
    creating,
    changeUserActive,
    handleModalVisible,
    intl,
  } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (method === 'create') {
        handleAdd({
          ...fieldsValue,
          active: userActive ? 'true' : 'false',
        });
      } else {
        handleEdit({
          ...fieldsValue,
          id: currentUser.id,
          active: userActive ? 'true' : 'false',
        });
      }
    });
  };
  const cancelHandle = () => {
    handleModalVisible();
  };
  const validateUsername = (rule, value, callback) => {
    if (method === 'create') {
      setTimeout(() => {
        request(`${urls.user.search}?${stringify({ username: value })}`).then(response => {
          if (response.user_exists) {
            const values = { name: value };
            callback(intl.formatMessage(messages.validate.nameExists, values));
          }
          callback();
        });
      }, 100);
    } else {
      callback();
    }
  };
  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 15,
    },
  };
  const roles = [
    {
      value: 1,
      label: 'Operator',
    },
    {
      value: 0,
      label: 'Admin',
    },
    {
      value: 2,
      label: 'User',
    },
  ];
  const roleOptions = roles.map(role => <Option value={role.value}>{role.label}</Option>);
  return (
    <Modal
      title={
        method === 'create'
          ? intl.formatMessage(messages.title.create)
          : intl.formatMessage(messages.title.edit)
      }
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle}
      confirmLoading={creating}
    >
      <FormItem {...formItemLayout} label={intl.formatMessage(messages.label.name)}>
        {form.getFieldDecorator('username', {
          initialValue: method === 'edit' ? currentUser.name : '',
          rules: [
            { required: true, message: intl.formatMessage(messages.validate.required.name) },
            { validator: validateUsername },
          ],
        })(
          <Input
            disabled={method === 'edit'}
            placeholder={intl.formatMessage(messages.label.name)}
          />
        )}
      </FormItem>
      {method === 'create' && (
        <FormItem {...formItemLayout} label={intl.formatMessage(messages.label.password)}>
          {form.getFieldDecorator('password', {
            initialValue: method === 'edit' ? currentUser.password : '',
            rules: [
              { required: true, message: intl.formatMessage(messages.validate.required.password) },
            ],
          })(<Input placeholder={intl.formatMessage(messages.label.password)} />)}
        </FormItem>
      )}
      <FormItem {...formItemLayout} label={intl.formatMessage(messages.label.role)}>
        {form.getFieldDecorator('role', {
          initialValue: method === 'edit' ? currentUser.role : roles[0].value,
          rules: [{ required: true, message: 'Please select a role' }],
        })(<Select>{roleOptions}</Select>)}
      </FormItem>
        {/*
            <FormItem {...formItemLayout} label={intl.formatMessage(messages.label.balance)}>
                {form.getFieldDecorator('balance', {
                    initialValue: method === 'edit' ? currentUser.balance : 0,
                    rules: [{required: true, message: 'Please input balance'}],
                })(<InputNumber min={0} max={1000}/>)}
            </FormItem>
        */}
      <FormItem {...formItemLayout} label={intl.formatMessage(messages.label.active)}>
        {form.getFieldDecorator('active', {})(
          <Switch checked={userActive} onChange={changeUserActive} />
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ user, loading }) => ({
  user,
  loadingUsers: loading.effects['user/fetch'],
}))
class UserManagement extends PureComponent {
  state = {
    modalVisible: false,
    userActive: true,
    creating: false,
    currentUser: {},
    method: 'create',
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetch',
    });
  }
  changeUserActive = checked => {
    this.setState({
      userActive: checked,
    });
  };
  addUser = values => {
    this.setState({
      creating: true,
    });
    this.props.dispatch({
      type: 'user/createUser',
      payload: {
        ...values,
        balance: 0,
        callback: this.handleModalVisible,
      },
    });
    this.setState({
      userActive: true,
    });
  };
  editUser = values => {
    this.setState({
      creating: true,
    });
    this.props.dispatch({
      type: 'user/updateUser',
      payload: {
        ...values,
        balance: 0,
        callback: this.handleModalVisible,
      },
    });
    this.setState({
      userActive: true,
    });
  };
  handleModalVisible = visible => {
    this.setState({
      creating: false,
      method: 'create',
      userActive: true,
      modalVisible: !!visible,
    });
  };
  operateItem = (item, type) => {
    const { dispatch, intl } = this.props;
    const values = { name: item.name };
    switch (type) {
      case 'edit':
        this.setState({
          creating: false,
          modalVisible: true,
          method: 'edit',
          currentUser: item,
          userActive: item.active,
        });
        break;
      case 'delete':
        Modal.confirm({
          title: intl.formatMessage(messages.confirm.deleteUser, values),
          onOk() {
            dispatch({
              type: 'user/deleteUser',
              payload: {
                id: item.id,
                name: item.name,
              },
            });
          },
        });
        break;
      default:
        break;
    }
  };
  render() {
    const { user, loadingUsers, intl } = this.props;
    const { modalVisible, userActive, creating, method, currentUser } = this.state;
    const { users, pageNo, pageSize, total } = user;
    const roles = ['Admin', 'Operator', 'User'];
    const columns = [
      {
        title: intl.formatMessage(messages.label.name),
        dataIndex: 'name',
      },
      {
        title: intl.formatMessage(messages.label.role),
        dataIndex: 'role',
        render: val => <span>{roles[val]}</span>,
      },
      {
        title: intl.formatMessage(messages.label.operate),
        render: (val, item) => (
          <Fragment>
            <a onClick={() => this.operateItem(item, 'edit')}>
              <FormattedMessage {...messages.button.edit} />
            </a>
              {/*
            <Divider type="vertical" />
            <a style={{ color: 'red' }} onClick={() => this.operateItem(item, 'delete')}>
              <FormattedMessage {...messages.button.delete} />
            </a>
*/}
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
      changeUserActive: this.changeUserActive,
      userActive,
      creating,
      method,
      currentUser,
      handleAdd: this.addUser,
      handleEdit: this.editUser,
      intl,
    };

    return (
      <PageHeaderLayout
          title={intl.formatMessage(messages.title.list)}
          logo={<Icon type="user" style={{fontSize: 30, color: '#722ed1'}} />}
          content={intl.formatMessage(messages.label.description)}
      >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
                {/*
                    <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                        <FormattedMessage {...messages.button.new} />
                    </Button>
                */}
            </div>
            <STable
              loading={loadingUsers}
              data={{list:users}}
              columns={columns}
            />
            {modalVisible && <CreateForm {...parentMethods} modalVisible={modalVisible} />}
          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

export default injectIntl(UserManagement);
