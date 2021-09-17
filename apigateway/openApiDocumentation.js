
let environment = process.env.NODE_ENV;
require('custom-env').env(environment);

module.exports = {
  openapi: '3.0.1',
  components: {
    schemas: {
      alertType: {
        type: 'string',
        description: 'Alert Type'

      },
      notificationType: {
        type: 'string'

      },
      roleId: {
        type: 'number'
      },
      tenantId: {
        type: 'integer',
        description: 'tenant Id'
      },
      notificationConditions: {
        type: 'string'
      },
      notificationData: {type:'string'},


      iotDeviceName: { type: 'string' },
      iotDeviceDetails: { type: 'string' },
      subscriptionStartDate: { type: 'string',format:'date' },
      subscriptionEndDate: { type: 'string' ,format:'date'},
      isActive: { type: 'boolean' },
      




      sensorId: {type:'number'},
      sensorData: { type: 'string' },
      isOptimum: {type:'string'},
      isCritical: { type: 'boolean' },
      dateTimeOfRecording: { type: 'string', format: 'date-time' },
     
      




      iotDeviceId: { type: 'number' },
      sensorName: { type: 'string' },
      sensorDetaiils: { type: 'string' },
      minValue: { type: 'string' },
      maxValue: {type:'string'},
      sensorTypeId: { type: 'string' },
      
      


      sensorType: { type: 'string' },
      sensorTypeDetails: {type:'string'},
      

      SocketId: {
        type: 'number'
      },
      CommunityUrl: {
        type: 'string'
      },
      RequestGuid: {
        type: 'string'
      },
      token: {
        type: 'string'
      },

      alertConfig: {
        type: 'object',
        properties: {
          alertType: {
            $ref: '#/components/schemas/alertType'
          },
          notificationType: {
            $ref: '#/components/schemas/notificationType'
          },
          roleId: {
            $ref: '#/components/schemas/roleId'
          },
          tenantId: {
            $ref: '#/components/schemas/tenantId'
          },
          notificationConditions: {
            $ref: '#/components/schemas/notificationConditions'
          }
        }
      },
    
      alertConfigsFinal: {
        type: 'object',
        properties: {
          DataCollection: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/alertConfig'
            }
          },
          SocketId: {
            $ref: '#/components/schemas/SocketId'
          },
          CommunityUrl: { $ref: '#/components/schemas/CommunityUrl' },
          RequestGuid: { $ref: '#/components/schemas/RequestGuid' },
          token: { $ref: '#/components/schemas/token' },

        }
      },





      iotDevice: {
        type: 'object',
        properties: {
          iotDeviceName: {
            $ref: '#/components/schemas/iotDeviceName'
          },
          iotDeviceDetails: {
            $ref: '#/components/schemas/iotDeviceDetails'
          },
          tenantId: {
            $ref: '#/components/schemas/tenantId'
          },
          subscriptionStartDate: {
            $ref: '#/components/schemas/subscriptionStartDate'
          },
          subscriptionEndDate: {
            $ref: '#/components/schemas/subscriptionEndDate'
          },
          isActive: { $ref: '#/components/schemas/isActive'}
        }
      },

      iotDeviceFinal: {
        type: 'object',
        properties: {
          DataCollection: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/iotDevice'
            }
          },
          SocketId: {
            $ref: '#/components/schemas/SocketId'
          },
          CommunityUrl: { $ref: '#/components/schemas/CommunityUrl' },
          RequestGuid: { $ref: '#/components/schemas/RequestGuid' },
          token: { $ref: '#/components/schemas/token' },

        }
      },






      sensorData: {
        type: 'object',
        properties: {
          sensorId: {
            $ref: '#/components/schemas/sensorId'
          },
          sensorData: {
            $ref: '#/components/schemas/sensorData'
          },
          isCritical: {
            $ref: '#/components/schemas/isCritical'
          },
          isOptimum: {
            $ref: '#/components/schemas/isOptimum'
          },
          dateTimeOfRecording: {
            $ref: '#/components/schemas/dateTimeOfRecording'
          }
        }
      },

      sensorDataFinal: {
        type: 'object',
        properties: {
          DataCollection: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/sensorData'
            }
          },
          SocketId: {
            $ref: '#/components/schemas/SocketId'
          },
          CommunityUrl: { $ref: '#/components/schemas/CommunityUrl' },
          RequestGuid: { $ref: '#/components/schemas/RequestGuid' },
          token: { $ref: '#/components/schemas/token' },

        }
      },







      sensorsType: {
        type: 'object',
        properties: {
          sensorType: {
            $ref: '#/components/schemas/sensorType'
          },
          sensorTypeDetails: {
            $ref: '#/components/schemas/sensorTypeDetails'
          }
        }
      },

      sensorsTypeFinal: {
        type: 'object',
        properties: {
          DataCollection: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/sensorsType'
            }
          },
          SocketId: {
            $ref: '#/components/schemas/SocketId'
          },
          CommunityUrl: { $ref: '#/components/schemas/CommunityUrl' },
          RequestGuid: { $ref: '#/components/schemas/RequestGuid' },
          token: { $ref: '#/components/schemas/token' },

        }
      },




      sensors: {
        type: 'object',
        properties: {
          iotDeviceId: {
            $ref: '#/components/schemas/iotDeviceId'
          },
          sensorName: {
            $ref: '#/components/schemas/sensorName'
          },
          sensorDetails: {
            $ref: '#/components/schemas/sensorDetails'
          },
          minValue: {
            $ref: '#/components/schemas/minValue'
          },
          maxValue: {
            $ref: '#/components/schemas/maxValue'
          }
          ,
          sensorTypeId: { $ref: '#/components/schemas/sensorTypeId'}
        }
      },

      sensorsFinal: {
        type: 'object',
        properties: {
          DataCollection: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/sensors'
            }
          },
          SocketId: {
            $ref: '#/components/schemas/SocketId'
          },
          CommunityUrl: { $ref: '#/components/schemas/CommunityUrl' },
          RequestGuid: { $ref: '#/components/schemas/RequestGuid' },
          token: { $ref: '#/components/schemas/token' },

        }
      },





      notifications: {
        type: 'object',
        properties: {
          notificationData: {
            $ref: '#/components/schemas/notificationData'
          },
          notificationType: {
            $ref: '#/components/schemas/notificationType'
          }
        }
      },

      notificationsFinal: {
        type: 'object',
        properties: {
          DataCollection: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/notifications'
            }
          },
          SocketId: {
            $ref: '#/components/schemas/SocketId'
          },
          CommunityUrl: { $ref: '#/components/schemas/CommunityUrl' },
          RequestGuid: { $ref: '#/components/schemas/RequestGuid' },
          token: { $ref: '#/components/schemas/token' },

        }
      },






      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          },
          internal_code: {
            type: 'string'
          }
        }
      }
    }
  },
  info: {

    title: 'Api Gateway',
    description: ' Iot-API Gateway',
    termsOfService: 'http://api_url/terms/',

  },
  servers: [
    {
      url: process.env.IOT_SERVICE,
      description: environment + "api gateway"
    },



  ],

  tags: [
    {
      name: 'CRUD operations'
    }
  ],
  paths: {
    '/test/IOTSERVICE/alertConfig/': {
      get: {
        tags: ['testalertconfigs'],
        description: 'Get  alertconfigs',
        operationId: 'getAlertConfigs',

        responses: {
          '200': {
            description: 'alertconfigs were obtained'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      post: {
        tags: ['testalertconfigs'],
        description: 'post alertconfigs',
        operationId: 'createAlertConfigs',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/alertConfigsFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'alertconfigs was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }

      }
    }
    ,
    '/test/IOTSERVICE/alertConfig/{id}': {
      delete: {
        tags: ['testalertconfigs'],
        description: 'delete alertconfigs',
        operationId: 'deleteAlertConfigs',
        parameters: [{
          name: 'id',
          description: "delete alert config",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'alertconfig was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      put: {
        tags: ['testalertconfigs'],
        description: 'put alertconfigs',
        operationId: 'putAlertConfigs',
        parameters: [{
          name: 'id',
          description: "put alert config",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/alertConfigsFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'alertconfig was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }







    },
    '/test/IOTSERVICE/iotdevice/': {
      get: {
        tags: ['testiotdevices'],
        description: 'Get  iotdevice',
        operationId: 'getIotDevice',
       

        responses: {
          '200': {
            description: 'IotDevices were obtained'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      post: {
        tags: ['testiotdevices'],
        description: 'post iotdevice',
        operationId: 'createIotDevice',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/iotDeviceFinal'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'IotDevice was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/test/IOTSERVICE/iotdevice/{id}': {
      delete: {
        tags: ['testiotdevices'],
        description: 'delete iotdevice',
        operationId: 'deleteIotDevice',
        parameters: [{
          name: 'id',
          description: "delete iot device",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'iotdevice wes deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      put: {
        tags: ['testiotdevices'],
        description: 'put iotDevice',
        operationId: 'putIotDevice',
        parameters: [{
          name: 'id',
          description: "put iot device",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/iotDeviceFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'iotDevice was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }








    },

    '/test/IOTSERVICE/sensordata/': {
      get: {
        tags: ['testsensorsdata'],
        description: 'Get  sensordata',
        operationId: 'getSensorData',

        responses: {
          '200': {
            description: 'sensorsdata were obtained'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      post: {
        tags: ['testsensorsdata'],
        description: 'post sensordata',
        operationId: 'createSensorData',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorDataFinal'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'sensordata was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/test/IOTSERVICE/sensordata/{id}': {
      delete: {
        tags: ['testsensorsdata'],
        description: 'delete sensordata',
        operationId: 'deleteSensorData',
        parameters: [{
          name: 'id',
          description: "delete sensor data",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'sensordata was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      
      put: {
        tags: ['testsensorsdata'],
        description: 'put sensorsdata',
        operationId: 'putSensorsData',
        parameters: [{
          name: 'id',
          description: "put sensors data",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorDataFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'sensorData was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }











    },


    '/test/IOTSERVICE/sensortype/': {
      get: {
        tags: ['testsensorstype'],
        description: 'Get  sensortype',
        operationId: 'getSensorType',

        responses: {
          '200': {
            description: 'sensorstype were obtained'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      post: {
        tags: ['testsensorstype'],
        description: 'post sensortype',
        operationId: 'createSensorType',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorsTypeFinal'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'sensortype was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/test/IOTSERVICE/sensortype/{id}': {
      delete: {
        tags: ['testsensorstype'],
        description: 'delete sensortype',
        operationId: 'deleteSensorType',
        parameters: [{
          name: 'id',
          description: "delete sensor type",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'sensortype was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
      ,

      put: {
        tags: ['testsensorstype'],
        description: 'put sensorstype',
        operationId: 'putSensorsType',
        parameters: [{
          name: 'id',
          description: "put sensors Type",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorsTypeFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'sensorsType was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }







    },


    '/test/IOTSERVICE/sensors/': {
      get: {
        tags: ['testsensors'],
        description: 'Get  sensors',
        operationId: 'getSensors',
        

        responses: {
          '200': {
            description: 'sensors were obtained'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      post: {
        tags: ['testsensors'],
        description: 'post sensors',
        operationId: 'createSensors',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorsFinal'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'sensors was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/test/IOTSERVICE/sensors/{id}': {
      delete: {
        tags: ['testsensors'],
        description: 'delete sensors',
        operationId: 'deleteSensors',
        parameters: [{
          name: 'id',
          description: "delete sensors",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'sensors was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
      ,

      put: {
        tags: ['testsensors'],
        description: 'put sensors',
        operationId: 'putSensors',
        parameters: [{
          name: 'id',
          description: "put sensors",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorsFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'sensors was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }









    },

    '/test/IOTSERVICE/notifications/': {
      get: {
        tags: ['testnotifications'],
        description: 'Get  notifications',
        operationId: 'getNotifications',

        responses: {
          '200': {
            description: 'notifications were obtained'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      post: {
        tags: ['testnotifications'],
        description: 'post notifications',
        operationId: 'createNotifications',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/notifications'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'notification was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/test/IOTSERVICE/notifications/{id}': {
      delete: {
        tags: ['testnotifications'],
        description: 'delete notifications',
        operationId: 'deleteNotifications',
        parameters: [{
          name: 'id',
          description: "delete notifications",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'notifications was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      put: {
        tags: ['testnotifications'],
        description: 'put notifications',
        operationId: 'putNotifications',
        parameters: [{
          name: 'id',
          description: "put notifications",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/notifications'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'notification was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }








    },


    '/IOT_SERVICE/ALERTCONFIGS/': {
      
      post: {
        tags: ['alertconfigs'],
        description: 'post alertconfigs',
        operationId: 'createAlertConfigs',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/alertConfigsFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'alertconfigs was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }

      }
    }
    ,
    '/IOT_SERVICE/ALERTCONFIGS/{id}': {
      delete: {
        tags: ['alertconfigs'],
        description: 'delete alertconfigs',
        operationId: 'deleteAlertConfigs',
        parameters: [{
          name: 'id',
          description: "delete alert config",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'alertconfig was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      put: {
        tags: ['alertconfigs'],
        description: 'put alertconfigs',
        operationId: 'putAlertConfigs',
        parameters: [{
          name: 'id',
          description: "put alert config",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/alertConfigsFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'alertconfig was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }







    },
    '/IOT_SERVICE/IOTDEVICE/': {
      
      post: {
        tags: ['iotdevices'],
        description: 'post iotdevice',
        operationId: 'createIotDevice',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/iotDeviceFinal'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'IotDevice was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/IOT_SERVICE/IOTDEVICE/{id}': {
      delete: {
        tags: ['iotdevices'],
        description: 'delete iotdevice',
        operationId: 'deleteIotDevice',
        parameters: [{
          name: 'id',
          description: "delete iot device",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'iotdevice wes deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      put: {
        tags: ['iotdevices'],
        description: 'put iotDevice',
        operationId: 'putIotDevice',
        parameters: [{
          name: 'id',
          description: "put iot device",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/iotDeviceFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'iotDevice was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }








    },

    '/IOT_SERVICE/SENSORDATA/': {
      
      post: {
        tags: ['sensorsdata'],
        description: 'post sensordata',
        operationId: 'createSensorData',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorDataFinal'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'sensordata was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/IOT_SERVICE/SENSORDATA/{id}': {
      delete: {
        tags: ['sensorsdata'],
        description: 'delete sensordata',
        operationId: 'deleteSensorData',
        parameters: [{
          name: 'id',
          description: "delete sensor data",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'sensordata was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },

      put: {
        tags: ['sensorsdata'],
        description: 'put sensorsdata',
        operationId: 'putSensorsData',
        parameters: [{
          name: 'id',
          description: "put sensors data",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorDataFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'sensorData was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }











    },


    '/IOT_SERVICE/SENSORTYPE/': {
      
      post: {
        tags: ['sensorstype'],
        description: 'post sensortype',
        operationId: 'createSensorType',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorsTypeFinal'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'sensortype was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/IOT_SERVICE/SENSORTYPE/{id}': {
      delete: {
        tags: ['sensorstype'],
        description: 'delete sensortype',
        operationId: 'deleteSensorType',
        parameters: [{
          name: 'id',
          description: "delete sensor type",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'sensortype was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
      ,

      put: {
        tags: ['sensorstype'],
        description: 'put sensorstype',
        operationId: 'putSensorsType',
        parameters: [{
          name: 'id',
          description: "put sensors Type",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorsTypeFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'sensorsType was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }







    },


    '/IOT_SERVICE/SENSORS/': {
      
      post: {
        tags: ['sensors'],
        description: 'post sensors',
        operationId: 'createSensors',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorsFinal'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'sensors was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/IOT_SERVICE/SENSORS/{id}': {
      delete: {
        tags: ['sensors'],
        description: 'delete sensors',
        operationId: 'deleteSensors',
        parameters: [{
          name: 'id',
          description: "delete sensors",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'sensors was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
      ,

      put: {
        tags: ['sensors'],
        description: 'put sensors',
        operationId: 'putSensors',
        parameters: [{
          name: 'id',
          description: "put sensors",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/sensorsFinal'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'sensors was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }









    },

    '/IOT_SERVICE/NOTIFICATIONS/': {
      
      post: {
        tags: ['notifications'],
        description: 'post notifications',
        operationId: 'createNotifications',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/notifications'
              }
            }
          },
          required: true
        },

        responses: {
          '200': {
            description: 'notification was posted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }
    }
    ,
    '/IOT_SERVICE/NOTIFICATIONS/{id}': {
      delete: {
        tags: ['notifications'],
        description: 'delete notifications',
        operationId: 'deleteNotifications',
        parameters: [{
          name: 'id',
          description: "delete notifications",
          in: 'path',
          required: true
        }

        ],
        responses: {
          '200': {
            description: 'notifications was deleted'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      },
      put: {
        tags: ['notifications'],
        description: 'put notifications',
        operationId: 'putNotifications',
        parameters: [{
          name: 'id',
          description: "put notifications",
          in: 'path',
          required: true
        }

        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/notifications'
              }
            }
          },
          required: true
        },
        responses: {
          '200': {
            description: 'notification was modified'


          },
          '400': {
            description: 'Missing parameters',

          }
        }
      }








    },










  }
}

