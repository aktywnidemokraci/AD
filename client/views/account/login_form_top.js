Template.loginFormTop.events({
    'submit form': function (e) {
        e.preventDefault();

        var user = {
            login: $(e.target).find('[name=login]').val(),
            password: $(e.target).find('[name=password]').val()
        }

        if (isNotEmpty(user.login, 'login') && isNotEmpty(user.password, 'hasło') && isValidPassword(user.password)) {
            Meteor.loginWithPassword(user.login, user.password, function (err) {
                if (err) {
                    throwError('Niepoprawne dane logowania.');
                } else {
                    if (Meteor.loggingIn()) {
                        Router.go('home');
                    }
                }
            });
        } else {
            throwError('Uzupelnij poprawnie pola formularza.');
            return false;
        }
    }
});