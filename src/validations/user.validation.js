/*** Global ***/
import utils from '../global/index.js'

/*** Stores ***/
import { UserStore } from '../stores/index.js'


/**
  * This function is used for validate user detail
  * @function create
  * @param { Object } user user's details
  * @returns { Boolean } return the meta for user validatation
*/

const create = async (user) => {
    const keys = Object.keys(user)

    if (keys.length <= 0)
        throwError('Atleast One field is required!')

    if (!keys.includes('loginWith')) {
        throwError('loginWith field is required it`s should be in [0, 1, 2]!')
    }

    if (!keys.includes('password'))
        throwError('password field is required')

    if (keys.includes('password')) {
        
        if (user.password === '') {
            throwError('password field is required')
        }

            if (user.password.length < 8) {
            throwError('password Have atleast 8 character Or Not contain spaces!')
        }
    }

    if (!keys.includes('userName')) {
        user.userName = utils.generateCode(12)
    }

    // if (keys.includes('userName')) {
    //     if (user.userName === '') {
    //         throwError('userName field is required')
    //     }

    //     if (user.userName.length < 10) {
    //         throwError('Usernames Have atleast 10 character Or Not contain spaces!')
    //     }

    //     if (validateUserName(user.userName)) {
    //         throwError('Usernames can only have: Lowercase Letters(a-z), Numbers(0-9), Dots(.), Underscores(_), dashe(-)')
    //     }

    //     try {
    //         const userExists = await UserStore.get({ userName: user.userName })

    //         if (userExists) {
    //             throwError('UserName is Already Exists!')
    //         }
    //     } catch (error) {
    //         throwError(error.message)
    //     }
    // }

    if (keys.includes('loginWith') && [0, 1, 2].includes(Number(user.loginWith))) {
        if (Number(user.loginWith) === 0) {
            if (!keys.includes('email') || !user.email || !validateEmail(user.email))
                throwError('Email field is required!')

            if (keys.includes('email')) {
                try {
                    const userExists = await UserStore.get({ email: user.email })

                    if (userExists) {
                        throwError('Email is Already Exists!')
                    }
                } catch (error) {
                    throwError(error.message)
                }
            }
        }

        if (Number(user.loginWith) === 1) {
            if (!keys.includes('mobile') || !user.mobile || !validateMobile(user.mobile))
                throwError('Mobile field is required & Atleast 10 character require!')

            if (keys.includes('mobile')) {
                try {
                    const userExists = await UserStore.get({ mobile: user.mobile })

                    if (userExists) {
                        throwError('Mobile is Already Exists!')
                    }
                } catch (error) {
                    throwError(error.message)
                }
            }

            if (!keys.includes('countryCode') || !user.countryCode)
                throwError('countryCode field is required')
        }
    }

    if (keys.includes('allImages')) {
        const images = user.allImages || []

        if (images.length > 0) {
            user.allImages = images.map((image) => image.filename)
        }
    }

    if (keys.includes('firstName') && user.firstName === '')
        throwError('firstName field is required')

    if (keys.includes('lastName') && user.lastName === '')
        throwError('lastName field is required!')

    if (keys.includes('country') && user.country === '')
        throwError('country field is required!')

    if (keys.includes('birthdate') && user.birthdate === '')
        throwError('Birthdate field is required!')

    if (keys.includes('height') && (!user.height || user.height <= 0))
        throwError('Birthdate field is required Or It`s Should Not lessthen 0!')

    if (keys.includes('gender') && user.gender === '')
        throwError('Gender field is required!')

    if (keys.includes('age') && (!user.age || user.age <= 18))
        throwError('Age field is required Or Age should be 18+ !')
}


/**
  * This function is used for validate user login detail
  * @function login
  * @param { Object } user user's details
  * @returns { Boolean } return the meta for user validatation
*/

const login = async (user) => {
    const keys = Object.keys(user)

    if (keys.length <= 0)
        throwError('Login Details required!')

    console.log([0, 1, 2].includes(Number(user.loginWith)));
    console.log(keys);

    if (!keys.includes('loginWith') || ![0, 1, 2].includes(Number(user.loginWith)))
        throwError('loginWith field is required || loginWith value should be 0, 1 or 2')

    if(!keys.includes('clientId') || !user.clientId) {
        throwError('clientId field is required!')
    }

    if (keys.includes('loginWith') && Number(user.loginWith) === 0) {
        if (!keys.includes('email') || !user.email)
            throwError('Email field is required!')

        if (keys.includes('email')) {
            if (!user.email) {
                throwError('Email field is required!')
            } else if (!validateEmail(user.email) && !validateMobile(user.email)) {
                throwError('Email field is not valid')
            }
        }
    }
}

/**
  * This function is used for validate user login detail
  * @function loginWithMobile
  * @param { Object } user user's details
  * @returns { Boolean } return the meta for user validatation
*/

const loginWithMobile = async (user) => {
    const keys = Object.keys(user)

    if (keys.length <= 0)
        throwError('Atleast One field is required')

    if (!keys.includes('loginWith') || ![0, 1, 2].includes(Number(user.loginWith)))
        throwError('loginWith field is required')

    if (keys.includes('loginWith') && Number(user.loginWith) === 0) {
        if (!keys.includes('mobile') || !user.mobile)
            throwError('Mobile field is required!')

        if ((keys.includes('mobile') && !user.mobile && !validateMobile(user.mobile) && !keys.includes('code')))
            throwError('Mobile Or Code fields is not valid')
    }
}


/**
  * This function is used for validate user update detail
  * @function update
  * @param { Object } user user's details
  * @returns { Boolean } return the meta for user validatation
*/

const update = async (user) => {
    const keys = Object.keys(user)

    if (keys.length <= 0)
        throwError('Atleast One field is required for update!')

    if (keys.includes('allImages')) {
        const images = user.allImages || []

        if (images.length > 0) {
            user.allImages = images.map((image) => image.filename)
        }
    }

    if (keys.includes('menuImage')) {
        const images = user.menuImage || []

        if (images.length > 0) {
            images.forEach((image) => user.menuImage = image.filename)
        }
    }

    if (keys.includes('userName')) {
        if (user.userName === '') {
            throwError('userName field is required')
        }

        if (user.userName.length < 10) {
            throwError('Usernames Have atleast 10 character Or Not contain spaces!')
        }

        if (validateUserName(user.userName)) {
            throwError('Usernames can only have: Lowercase Letters(a-z), Numbers(0-9), Dots(.), Underscores(_), dashe(-)')
        }

        try {
            const userExists = await UserStore.get({ userName: user.userName })

            if (userExists) {
                throwError('UserName is Already Exists!')
            }
        } catch (error) {
            throwError(error.message)
        }
    }

    if (keys.includes('loginWith') && [0, 1, 2].includes(Number(user.loginWith))) {
        if (Number(user.loginWith) === 0) {
            if (keys.includes('mobile') && !user.mobile && !validateMobile(user.mobile))
                throwError('Mobile field is required & Atleast 10 character require!')

            if (keys.includes('mobile')) {
                try {
                    const userExists = await UserStore.get({ mobile: user.mobile })

                    if (userExists) {
                        throwError('Mobile is Already Exists!')
                    }
                } catch (error) {
                    throwError(error.message)
                }
            }

            if (keys.includes('countryCode') && !user.countryCode)
                throwError('countryCode field is required')
        }
    }

    if (keys.includes('firstName') && user.firstName === '')
        throwError('firstName field is required')

    if (keys.includes('lastName') && user.lastName === '')
        throwError('lastName field is required!')

    if (keys.includes('country') && user.country === '')
        throwError('country field is required!')

    if (keys.includes('birthdate') && user.birthdate === '')
        throwError('Birthdate field is required!')

    if (keys.includes('height') && (!user.height || user.height <= 0))
        throwError('Birthdate field is required Or It`s Should Not lessthen 0!')

    if (keys.includes('weight') && (!user.weight || user.weight <= 0))
        throwError('Weight field is required Or It`s Should Not lessthen 0!')

    if (keys.includes('gender') && user.gender === '')
        throwError('Gender field is required!')

    if (keys.includes('age') && (!user.age || user.age <= 18))
        throwError('Age field is required Or Age should be 18+ !')

    if (keys.includes('education') && !user.education)
        throwError('education field is required')

    if (keys.includes('maritalStatus') && !user.maritalStatus)
        throwError('maritalStatus field is required')

    if (keys.includes('lookingFor') && !user.lookingFor)
        throwError('lookingFor field is required')

    if (keys.includes('religion') && !user.religion)
        throwError('religion field is required')

    if (keys.includes('personality') && !user.personality)
        throwError('personality field is required')

    if (keys.includes('drinking') && !user.drinking)
        throwError('drinking field is required')

    if (keys.includes('smoking') && !user.smoking)
        throwError('smoking field is required')

    if (keys.includes('eating') && !user.eating)
        throwError('eating field is required')

    if (keys.includes('location') && !user.location)
        throwError('location field is required')

    if (keys.includes('tags') && (!user.tags || Object.keys(user.tags).length <= 0))
        throwError('tags field is required')
}

/**
  * This function is used for validate user email
  * @function validateEmail
  * @param { String } email user's details
  * @returns { Boolean } return the meta for user email validation
*/

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


/**
  * This function is used for validate user mobile
  * @function validateMobile
  * @param { Number || String } mobile user's details
  * @returns { Boolean } return the meta for user mobile validatation
*/

const validateMobile = (mobile) => {
    return mobile.length >= 10
}


/**
  * This function is used for validate user's username
  * Note: Usernames can only have: 
        - Lowercase Letters (a-z) 
        - Numbers (0-9)
        - Dots (.)
        - Underscores (_)
        - dashe (-)
  * @function validateUserName
  * @param { Number || String } userName user's details
  * @returns { Boolean } return the meta for username validatation
*/

const validateUserName = (userName) => {
    const regex = new RegExp(/^[a-z0-9_\.-]+$/)
    return !regex.test(userName)
}


/**
  * This function is used for throw error
  * Note: used for only this page for throw error
  * @function throwError
  * @param { Number || String || Object || Array } message error details
  * @returns { Boolean } return the meta for error
*/

const throwError = (message) => {
    return utils.throwError(500, '', message)()
}

export default {
    create,
    validateMobile,
    validateUserName,
    login,
    update
}