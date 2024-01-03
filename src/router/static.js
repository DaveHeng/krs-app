export const sourceData = [
  {
    
    name: 'Datav',
    type: 'P',
    path: '/datav',
    component: 'datav/index',
    title: '大屏'
  },
	{
		name: 'Online Monitoring',
		type: 'M',
		path: 'online-monitoring',
		component: 'onlineMonitor/index',
		title: '在线监测',
		icon: 'OnlineIcon'
	},
	{
		name: 'DataSearch',
		type: 'C',
		title: '数据检索',
		path: 'data-search',
		icon: 'FileSearchOutlined',
		children: [
			{
				name: 'HistoryData',
				type: 'M',
				path: 'historyData',
				title: '历史数据',
				component: 'historyData/index'
			},
			{
				name: 'AlarmData',
				type: 'M',
				path: 'alarmData',
				title: '告警数据',
				component: 'alarmData/index'
			}
		]
	},
	{
		name: 'Statistics',
		type: 'C',
		title: '统计分析',
		path: 'statistics',
		icon: 'StatisticsIcon',
		children: [
			{
				name: 'HistoryState',
				type: 'M',
				path: 'historyState',
				title: '历史状态',
				component: 'historyState/index'
			}
		]
	},
	{
		name: 'System Setting',
		type: 'C',
		path: 'system-setting',
		title: '系统管理',
		icon: 'SettingOutlined',
		children: [
      {
				name: 'Device Manage',
				type: 'M',
				path: 'deviceManage',
				title: '设备管理',
				component: 'deviceManage/index'
			},
			{
				name: 'Map Manage',
				type: 'M',
				path: 'mapManage',
				title: '地图管理',
				component: 'mapManage/index'
			},
			{
				name: 'Dict',
				type: 'M',
				path: 'dict',
				title: '字典管理',
				component: 'dict/index',
				children: [
					{
						name: 'Dict:C',
						type: 'B',
						title: '查看'
					},
					{
						name: 'Dict:A',
						type: 'B',
						title: '新增'
					},
					{
						name: 'Dict:D',
						type: 'B',
						title: '删除'
					},
					{
						name: 'Dict:E',
						type: 'B',
						title: '编辑'
					}
				]
			}
		]
	},
  {
    name: 'DeviceSettingImage',
    type: 'M',
    path: 'deviceSettingImage',
    component: 'deviceSettingImage/index',
    title: '设备布置图',
		icon: 'MapIcon'
  }
]

export const permissions = [
  'Datav',
	'Online Monitoring',
  'Device Manage',
	'System Setting',
	'DataSearch',
	'Statistics',
	'HistoryState',
	'HistoryData',
  'Map Manage',
	'AlarmData',
  'DeviceSettingImage',
	'Dict',
	'Dict:C',
	'Dict:A',
	'Dict:D',
	'Dict:E'
]
