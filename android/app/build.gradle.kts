plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.ertapanjatakia.jestbox"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.ertapanjatakia.jestbox"
        minSdk = 23
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }
    buildTypes {
        debug {
            applicationIdSuffix = ".debug"
            versionNameSuffix = "-debug"
        }
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    sourceSets {
        getByName("main").assets.srcDir(layout.buildDirectory.dir("generated/jestbox-assets"))
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions { jvmTarget = "17" }
}

val syncJestBoxWebAssets by tasks.registering(Sync::class) {
    from(rootProject.projectDir.parentFile) {
        include("index.html", "script.js", "styles.css")
        into("www")
    }
    from(rootProject.projectDir.parentFile.resolve("assets")) {
        include("**/*")
        into("www/assets")
    }
    into(layout.buildDirectory.dir("generated/jestbox-assets"))
}
tasks.named("preBuild").configure { dependsOn(syncJestBoxWebAssets) }
