import { Button, Input, InputRef, Space, Table } from 'antd';
import {
  ColumnsType,
  ColumnType,
  FilterConfirmProps,
} from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState, useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import { LocationViewType } from '../type';
import { sortColumn } from '../util/sortColumn';

type DataIndex = keyof LocationViewType;

interface LocationTableProps {
  dataSet: LocationViewType[];
}

export default function LocationTable({ dataSet }: LocationTableProps) {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<LocationViewType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<LocationViewType> = useMemo(
    () => [
      {
        title: 'Street',
        dataIndex: 'street',
        key: 'street',
        ...getColumnSearchProps('street'),
        sorter: (a, b) => sortColumn(a.street, b.street),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        ...getColumnSearchProps('city'),
        sorter: (a, b) => sortColumn(a.city, b.city),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'State',
        dataIndex: 'state',
        key: 'state',
        ...getColumnSearchProps('state'),
        sorter: (a, b) => sortColumn(a.state, b.state),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        ...getColumnSearchProps('country'),
        sorter: (a, b) => sortColumn(a.country, b.country),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Postcode',
        dataIndex: 'postcode',
        key: 'postcode',
        ...getColumnSearchProps('postcode'),
        sorter: (a, b) => sortColumn(a.postcode, b.postcode),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Coordinates',
        dataIndex: 'coordinates',
        key: 'coordinates',
        ...getColumnSearchProps('coordinates'),
        sorter: (a, b) => sortColumn(a.coordinates, b.coordinates),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Timezone',
        dataIndex: 'timezone',
        key: 'timezone',
        ...getColumnSearchProps('timezone'),
        sorter: (a, b) => sortColumn(a.timezone, b.timezone),
        sortDirections: ['descend', 'ascend'],
      },
    ],
    [getColumnSearchProps, sortColumn]
  );

  return (
    <Table
      columns={columns}
      dataSource={dataSet}
      rowKey={(record) => record.street}
    />
  );
}
