+++
title = "Formulation"
author = ["Jethro Kuan"]
lastmod = 2019-01-18T21:08:13+08:00
tags = ["machine_learning", "ipython"]
draft = false
math = true
+++

In this experiment, the training and test examples are generated with
the function \\(y=x\\) with Gaussian noise added. We fit a linear function
and a 10th degree polynomial.

For the 10th degree polynomial, we fit using polynomial regression and
then with ridge regression. In scikit learn, ridge regression finds
\\(\min\_w ||Xw - y||\_2^2 +\alpha||w||\_2^2\\).

```ipython
%matplotlib inline
import matplotlib.pyplot as plt
import numpy as np
```

```ipython
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_squared_error
from sklearn.pipeline import Pipeline
import matplotlib.pyplot as plt
import numpy as np

# Set seed for random number generator to make results reproducible
np.random.seed(1)

# Number of data points in train and test sets
data_size = 100
data_interval = 10.0/data_size

reg = 0.01
if data_size == 10:
    reg = 0.2

# Linear regression model
linear = LinearRegression(fit_intercept=True,normalize=True)
# Polynomial regression model, degree the same as data size
poly = Pipeline([('poly', PolynomialFeatures(degree=10)),
                 ('lin', LinearRegression(fit_intercept=True, normalize=True))])

# Polynomial regression model with ridge regression, degree the same as data size
ridgepoly = Pipeline([('poly', PolynomialFeatures(degree=10)),
                      ('ridgereg', Ridge(alpha = reg, fit_intercept=True,normalize=True))])

# Construct training set
# Output is y = x + noise
xtrain = np.arange(data_interval/2, 10, data_interval)
train_noise = np.random.normal(0, 1, data_size)
ytrain = xtrain + train_noise

# Fit the models
linear = linear.fit(xtrain[:, np.newaxis], ytrain)
poly = poly.fit(xtrain[:, np.newaxis], ytrain)
ridgepoly = ridgepoly.fit(xtrain[:, np.newaxis], ytrain)


# Construct test set, interleaved with training set
xtest = np.arange(data_interval,10 + data_interval/2, data_interval)
test_noise = np.random.normal(0, 1, data_size)

# Do predictions
linear_pred = linear.predict(xtest[:,np.newaxis])
poly_pred = poly.predict(xtest[:,np.newaxis])
ridgepoly_pred = ridgepoly.predict(xtest[:,np.newaxis])

# Measure mean squared error
ytest = xtest + test_noise
linerror = mean_squared_error(ytest, linear_pred)
polyerror = mean_squared_error(ytest, poly_pred)
ridgepolyerror = mean_squared_error(ytest, ridgepoly_pred)

# Plotting
x_plot = np.linspace(0, 10, 100)

fig = plt.figure(1, figsize=(12, 13.5))
fig.clf()

sub1 = fig.add_subplot(3,2,1)
sub1.set_title('Lin Reg Train Set')
sub1.scatter(xtrain, ytrain,  color='red')
sub1.plot(x_plot, linear.predict(x_plot[:,np.newaxis]), color='green',linewidth=3)

sub2 = fig.add_subplot(3,2,2)
sub2.set_title('Lin Reg Test Set')
sub2.scatter(xtest, ytest,  color='red')
sub2.plot(x_plot, linear.predict(x_plot[:,np.newaxis]), color='green',linewidth=3)

sub3 = fig.add_subplot(3,2,3)
sub3.set_title('Poly Reg Train Set')
sub3.scatter(xtrain, ytrain,  color='red')
sub3.set_ylim([-2,12])
sub3.plot(x_plot, poly.predict(x_plot[:,np.newaxis]), color='green',linewidth=3)

sub4 = fig.add_subplot(3,2,4)
sub4.set_title('Poly Reg Test Set')
sub4.scatter(xtest, ytest,  color='red')
sub4.set_ylim([-2,12])
sub4.plot(x_plot, poly.predict(x_plot[:,np.newaxis]), color='green',linewidth=3)

sub5 = fig.add_subplot(3,2,5)
sub5.set_title('Ridge Poly Reg Train Set')
sub5.scatter(xtrain, ytrain,  color='red')
sub5.set_ylim([-2,12])
sub5.plot(x_plot, ridgepoly.predict(x_plot[:,np.newaxis]), color='green',linewidth=3)

sub6 = fig.add_subplot(3,2,6)
sub6.set_title('Ridge Poly Reg Test Set')
sub6.scatter(xtest, ytest,  color='red')
sub6.plot(x_plot, ridgepoly.predict(x_plot[:,np.newaxis]), color='green',linewidth=3)

fig.show()
print("Linear test set error: " + "{0:.2f}".format(linerror))
print("Poly test set error: " + "{0:.2f}".format(polyerror))
print("Ridge poly test set error: " + "{0:.2f}".format(ridgepolyerror))
```

{{< figure src="/ox-hugo/4Tzjjm.png" >}}
