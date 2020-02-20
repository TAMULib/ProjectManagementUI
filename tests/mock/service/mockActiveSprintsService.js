var mockActiveSprints = [{
  id: "7820",
  name: "Sprint 3",
  project: "chronam",
  cards: [{
    id: 7802,
    number: "B-03351",
    type: "Feature",
    status: "Accepted",
    name: "As a Customer I want to see 8 random issues on the front page, so that blank entries don't ever show",
    estimate: 2,
    assignees: []
  }, {
    id: 7803,
    number: "D-01153",
    type: "Defect",
    status: "Accepted",
    name: "Date limiting functionallity in search not working.",
    estimate: 3,
    assignees: []
  }, {
    id: 7804,
    number: "B-03352",
    type: "Feature",
    status: "Accepted",
    name: "Remove route for for viewing MARC records.",
    estimate: 0,
    assignees: []
  }, {
    id: 7805,
    number: "B-03353",
    type: "Feature",
    status: "Done",
    name: "Add pagination to bottom of search results.",
    estimate: 0.5,
    assignees: []
  }, {
    id: 7806,
    number: "B-03354",
    type: "Feature",
    status: "Accepted",
    name: "Add metadata to search results",
    estimate: 3,
    assignees: []
  }, {
    id: 7854,
    number: "B-03367",
    type: "Feature",
    status: "Done",
    name: "Rearrange and remove uneeded fields from advanced search page.",
    assignees: []
  }, {
    id: 7856,
    number: "B-03369",
    type: "Feature",
    status: "Accepted",
    name: "Search bar should redirect to search results when submitted.",
    assignees: []
  }, {
    id: 7859,
    number: "D-01155",
    type: "Defect",
    status: "Accepted",
    name: "Batch loading is failing on call to library of congress' website.",
    description: "<p>Attempting to retrieve an xml file from the LC website, but being denied permission.</p>\n<p>Moved a copy of the file to:</p>\n<p>http://php.library.tamu.edu/marc.xml</p>\n<p>And now hitting that url for the file.</p>",
    assignees: [{
      id: "6616",
      name: "Ryan Laddusaw",
      avatar: "no_avatar.png"
    }]
  }, {
    id: 7860,
    number: "B-03370",
    type: "Feature",
    status: "Accepted",
    name: "Add advanced search link.",
    assignees: [{
      id: 6616,
      name: "Ryan Laddusaw",
      avatar: "no_avatar.png"
    }]
  }]
}];

angular.module("mock.activeSprintsService", []).service("ActiveSprintsService", function ($q) {
  var service = mockService($q);

  service.getActiveSprints = function () {
    return mockActiveSprints;
  };

  service.updated = $q.defer().promise;

  return service;
});
