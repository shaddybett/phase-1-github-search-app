
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const input = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get the entered username from the input field
        const username = input.value.trim();

        // Implement the GitHub API request logic here
        fetch(`https://api.github.com/search/users?q=${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Implement code to display user data in userList
            userList.innerHTML = ''; // Clear previous results
            data.items.forEach(user => {
                const userElement = document.createElement('li');
                userElement.innerHTML = `
                    <h3>${user.login}</h3>
                    <img src="${user.avatar_url}" alt="${user.login} avatar">
                    <a href="${user.html_url}" target="_blank">GitHub Profile</a>
                `;
                userList.appendChild(userElement);

                // Add an event listener for each user element
                userElement.addEventListener('click', () => {
                    // Fetch user repositories when clicked
                    fetch(`https://api.github.com/users/${user.login}/repos`, {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    })
                    .then(response => response.json())
                    .then(repos => {
                        // Implement code to display user repositories in reposList
                        reposList.innerHTML = ''; // Clear previous results
                        repos.forEach(repo => {
                            const repoElement = document.createElement('li');
                            repoElement.innerHTML = `
                                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                            `;
                            reposList.appendChild(repoElement);
                        });
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});