/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = require('app');
require('controllers/main/views_controller');
var testHelpers = require('test/helpers');

var mainViewsController;
describe('MainViewsController', function () {

  beforeEach(function () {
    mainViewsController = App.MainViewsController.create();
  });

  describe('#loadAmbariViews()', function () {
    beforeEach(function () {
      this.stub = sinon.stub(App.router, 'get');
    });
    afterEach(function () {
      App.router.get.restore();
    });

    it('should load views if the user is logged in', function () {
      this.stub.withArgs('loggedIn').returns(true);
      mainViewsController.loadAmbariViews();
      var args = testHelpers.findAjaxRequest('name', 'views.info');
      expect(args).to.exists;
    });

    it('should not load views if the user is not logged in', function () {
      this.stub.withArgs('loggedIn').returns(false);
      mainViewsController.loadAmbariViews();
      var args = testHelpers.findAjaxRequest('name', 'views.info');
      expect(args).to.not.exists;
    })
  });

});
