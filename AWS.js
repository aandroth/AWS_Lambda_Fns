
export function awsGetUserAttributes(userPool, reduxFunc) {
    userPool.storage.sync((err, result) => {
        if (err) {
            return err;
        }
        else if (result === 'SUCCESS') {
            let user = userPool.getCurrentUser();
            user.getSession((err, session) => {
                if (err) {
                    return err;
                } else {
                    user.getUserAttributes((err, result) => {
                        if (err) {
                            return err;
                        } else {
                            let nickname;
                            let email;
                            for (let i = 0; i < result.length; i++) {
                                let attributeName = result[i].getName();
                                let attributeValue = result[i].getValue();
                                if (attributeName === 'nickname') {
                                    nickname = attributeValue;
                                } else if (attributeName === 'email') {
                                    email = attributeValue;
                                }
                            }
                            reduxFunc(nickname, email);
                        }
                    });
                }
            });
        }
    });
}
