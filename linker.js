var template = 'https://jira.intgdc.com/browse/$0';

var RE_JIRA_ISSUE = /[A-Z]{2,3}-[0-9]+/g;

function createLinks() {
    var titles = document.querySelectorAll('.js-issue-title');
    console.log(titles);
    [].slice.apply(titles).forEach(function(node) {
        var newTitle = node.innerText.replace(RE_JIRA_ISSUE, function(str) {
            var uri = template.replace('$0', str);

            var node = document.createElement('a');
            node.setAttribute('href', uri);
            node.setAttribute('target', '_blank');
            node.innerText = str;

            return node.outerHTML;
        });
        node.innerHTML = newTitle;
    });
}

window.addEventListener('onpopstate', createLinks);
createLinks();
