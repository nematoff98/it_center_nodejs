const {DataTypes} = require('sequelize')
const sequelize = require('../db')


const Users = sequelize.define('users', {
    login: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    full_name: {type: DataTypes.STRING, allowNull: false}
})

const Contact = sequelize.define('contact', {
    logo: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false}
})

const Main = sequelize.define('main', {
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
})

const ForCourse = sequelize.define('for_course', {
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const LearnCourse = sequelize.define('learn_course', {
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
})

const LearnCourseInfos = sequelize.define('learn_course_info', {
    icon: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING, allowNull: false},
})

const MoreInfo = sequelize.define('more_info', {
    bg_image: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const CourseProgram = sequelize.define('course_program', {
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING},
})

const CourseProgramModules = sequelize.define('course_program_modules', {
    module_number: {type: DataTypes.STRING},
    module_text: {type: DataTypes.STRING, allowNull: false},
})

const CourseInstructor = sequelize.define('course_instructor', {
    name: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.STRING},
    level_info: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},
})

const HaveCourse = sequelize.define('have_course', {
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const CostEducationBlocks = sequelize.define('cost_education_blocks', {
    title: {type: DataTypes.STRING, allowNull: false},
    subTitle: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    price: {type: DataTypes.STRING, allowNull: false}
})

const CostEducationRoles = sequelize.define('student_roles', {
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            customValidator(value) {
                if(value > 1) {
                    throw new Error('noto`g`ri qiymat kiritilgan')
                }
            }
        }
    },
    text: {type: DataTypes.STRING, allowNull: false},
})

const EnrolledCourse = sequelize.define('enrolled_course', {
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, validate: {email: true}},
    phone: {type: DataTypes.STRING, allowNull: false},
})

const MoreInformation = sequelize.define('more_information', {
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})


LearnCourse.hasMany(LearnCourseInfos, {as: 'info', foreignKey: 'parent_id'})
LearnCourseInfos.belongsTo(LearnCourse, {as: 'course', foreignKey: 'parent_id'})

CourseProgram.hasMany(CourseProgramModules, {as: 'modules', foreignKey: 'parent_id'})
CourseProgramModules.belongsTo(CourseProgram, {as: 'course_program', foreignKey: 'parent_id'})

CostEducationBlocks.hasMany(CostEducationRoles, {as: 'roles', foreignKey: 'parent_id'})
CostEducationRoles.belongsTo(CostEducationBlocks, {as: 'cost', foreignKey: 'parent_id'})


module.exports = {
    Contact,
    Main,
    ForCourse,
    LearnCourse,
    LearnCourseInfos,
    MoreInfo,
    CourseProgram,
    CourseProgramModules,
    CourseInstructor,
    HaveCourse,
    CostEducationBlocks,
    EnrolledCourse,
    MoreInformation,
    CostEducationRoles,
    Users
}
