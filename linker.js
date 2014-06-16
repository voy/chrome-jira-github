var template = 'https://jira.intgdc.com/browse/$0';

var RE_JIRA_ISSUE = /[A-Z]{2,3}-[0-9]+/g;

function issueIdToLink(issueId) {
    var uri = template.replace('$0', issueId);

    var node = document.createElement('a');
    node.setAttribute('href', uri);
    node.setAttribute('target', '_blank');
    node.style.color = '#4183c4';
    node.innerText = issueId;

    return node.outerHTML;
}

function createLinks() {
    // pull request detail
    var titles = document.querySelectorAll('.js-issue-title');
    [].slice.apply(titles).forEach(function(node) {
        node.innerHTML = node.innerText.replace(RE_JIRA_ISSUE, issueIdToLink);
    });

    // pull request list
    titles = document.querySelectorAll('.pulls-list .js-navigation-open');
    [].slice.apply(titles).forEach(function(node) {
        var clone = node.cloneNode(true);
        clone.innerHTML = '';
        var startTag = clone.outerHTML.split('</')[0];

        var str = node.innerText.replace(RE_JIRA_ISSUE, function(issueId) {
            var link = issueIdToLink(issueId);
            return '</a>' + link + startTag;
        });
        node.outerHTML = startTag + str + '</a>';
    });
}

// poll for location changes - anyone knows better solution let me know
var url = window.location + '';
setInterval(function() {
    var newUrl = window.location + '';
    if (url !== newUrl) {
        url = newUrl;
        createLinks();
    }
}, 2000);

// initial run
createLinks();
